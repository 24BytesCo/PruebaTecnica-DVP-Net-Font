import { Injectable } from '@angular/core';
import { NbToastrService, NbGlobalPhysicalPosition, NbGlobalPosition, NbComponentStatus } from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private index: number = 0;
  private duration: number = 2000; // Duración predeterminada de 2 segundos
  private destroyByClick: boolean = true;
  private hasIcon: boolean = true;
  private position: NbGlobalPosition = NbGlobalPhysicalPosition.TOP_RIGHT;
  private preventDuplicates: boolean = false;

  constructor(private toastrService: NbToastrService) {}

  // Método general para mostrar un toast con configuración personalizada
  showToast(type: NbComponentStatus, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: this.destroyByClick,
      duration: this.duration,
      hasIcon: this.hasIcon,
      position: this.position,
      preventDuplicates: this.preventDuplicates,
    };

    this.index += 1;
    const titleContent = title ? `${title}` : '';
    this.toastrService.show(body, titleContent, config);
  }

  // Método para mostrar un toast de éxito
  showSuccessToast(title: string, message: string) {
    this.showToast('success', title, message);
  }

  // Método para mostrar un toast de error
  showErrorToast(title: string, message: string) {
    this.showToast('danger', title, message);
  }

  // Método para mostrar un toast de advertencia
  showWarningToast(title: string, message: string) {
    this.showToast('warning', title, message);
  }

  // Método para mostrar un toast de información
  showInfoToast(title: string, message: string) {
    this.showToast('info', title, message);
  }

  // Método para cambiar la configuración de duración
  setDuration(duration: number) {
    this.duration = duration;
  }

  // Método para cambiar la posición del toast
  setPosition(position: NbGlobalPosition) {
    this.position = position;
  }
}
