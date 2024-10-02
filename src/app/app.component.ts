/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from "@angular/core";
import { AnalyticsService } from "./@core/utils/analytics.service";
import { SeoService } from "./@core/utils/seo.service";
import { SpinnerService } from "./@core/mock/spinner.service";

@Component({
  selector: "ngx-app",
  template: `
    <style>
      .hidden {
        display: none !important;
      }
      .vissible {
        display: block;
      }
      @-webkit-keyframes spin {
        0% {
          transform: rotate(0);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      @-moz-keyframes spin {
        0% {
          -moz-transform: rotate(0);
        }
        100% {
          -moz-transform: rotate(360deg);
        }
      }
      @keyframes spin {
        0% {
          transform: rotate(0);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      .spinner {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1051;
        background: #000000;
        overflow: hidden;
      }
      .spinner div:first-child {
        display: block;
        position: relative;
        left: 50%;
        top: 50%;
        width: 150px;
        height: 150px;
        margin: -75px 0 0 -75px;
        border-radius: 50%;
        box-shadow: 0 3px 3px 0 rgba(255, 56, 106, 1);
        transform: translate3d(0, 0, 0);
        animation: spin 2s linear infinite;
      }
      .spinner div:first-child:after,
      .spinner div:first-child:before {
        content: "";
        position: absolute;
        border-radius: 50%;
      }
      .spinner div:first-child:before {
        top: 5px;
        left: 5px;
        right: 5px;
        bottom: 5px;
        box-shadow: 0 3px 3px 0 rgb(255, 228, 32);
        -webkit-animation: spin 3s linear infinite;
        animation: spin 3s linear infinite;
      }
      .spinner div:first-child:after {
        top: 15px;
        left: 15px;
        right: 15px;
        bottom: 15px;
        box-shadow: 0 3px 3px 0 rgba(61, 175, 255, 1);
        animation: spin 1.5s linear infinite;
      }
    </style>
    <div
      class="spinner"
      [ngClass]="{ hidden: !isLoading, visible: isLoading }"
    >
      <div class="blob blob-0"></div>
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
      <div class="blob blob-4"></div>
      <div class="blob blob-5"></div>
    </div>

    <router-outlet></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  isLoading = false;
  constructor(
    private analytics: AnalyticsService,
    private seoService: SeoService,
    private spinnerService: SpinnerService
  ) {}

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
    this.spinnerService.spinnerState.subscribe((state: boolean) => {
      setTimeout(() => {
        this.isLoading = state;
      }, 0);
    });
  }
}
