import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, finalize, tap } from "rxjs/operators";
import { environment } from "../../../environments/environment";
import { UserService } from "../mock/user.service";
import { ToastService } from "../mock/toast.service";
import { JwtDecoderService } from "../mock/decrypt-ervice.service";
import { SpinnerService } from "../mock/spinner.service";

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private encryptionEnabled: boolean = environment.encryptionEnabled;
  constructor(
    private _userService: UserService,
    private _toastService: ToastService,
    private _decryptService: JwtDecoderService,
    private spinnerService: SpinnerService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinnerService.show();
    const apiUrl = environment.apiUrl;
    const token = this._userService.getUserToken();

    // Clonamos el request para agregar la URL de la API
    const clonedRequest = request.clone({
      url: `${apiUrl}${request.url}`,
      setHeaders: {
        Authorization: `Bearer ${token ?? ""}`,
      },
    });


    // Manejamos tanto las respuestas positivas como los errores
    return next.handle(clonedRequest).pipe(
      tap((event: any) => {
        const body = event?.body;

        // Verificamos que el cuerpo de la respuesta tiene la estructura esperada
        if (body?.data && this.encryptionEnabled) {
          // Intentamos desencriptar los datos
          body.data = this._decryptService.getUserInfoFromToken(body.data);
        }

        // Si la respuesta contiene un objeto `GenericResponse` y es exitosa, mostramos un mensaje
        if (event.body && event.body.isSuccessful && event.body.message) {
          this._toastService.setDuration(3000);
          this._toastService.showSuccessToast("Exito", event.body.message);
        }

        if (event.body && !event.body.isSuccessful && event.body.message) {
          this._toastService.showErrorToast("Error", event.body.message);
        }
      }),
      finalize(()=>
        {
          this.spinnerService.hide();
        }),
      catchError((error: HttpErrorResponse) => {
        let errormessage = "Ocurrió un error inesperado";

        // Manejo de errores
        if (error.error instanceof ErrorEvent) {
          // Errores del lado del cliente o red
          errormessage = `Error: ${error.error.message}`;
        } else {
          // Errores del lado del servidor
          if (error.status === 400 && error.error?.message) {
            // Si la API envía el mensaje de error
            errormessage = error.error.message;
          } else if (error.error && error.error.message) {
            // Si la API usa el wrapper `GenericResponse`
            errormessage = error.error.message;
          } else {
            errormessage = `Error ${error.status}: ${error.message}`;
          }
        }

        // Mostramos una notificación de error
        this._toastService.showErrorToast("", errormessage);

        // Retornamos el error para que el flujo no se interrumpa
        return throwError(errormessage);
      })
    );
  }
}
