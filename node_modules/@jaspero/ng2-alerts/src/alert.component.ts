import {Component, Injector, HostBinding, Output, EventEmitter, OnInit, NgZone} from '@angular/core';
import {AlertType} from './interfaces/alert-type';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'jaspero-alert',
    template: `
        <div *ngIf="incomingData.overlay" class="jaspero__overlay" [@overlayAn]="animationState" (click)="overlayClick()"></div>
        <div class="jaspero__dialog" [@wrapperAn]="animationState">
            <div class="jaspero__dialog-icon" [ngSwitch]="type">
                <ng-template ngSwitchCase="success">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490.4 490.4">
                        <path d="M245.2 0C110 0 0 110 0 245.2s110 245.2 245.2 245.2 245.2-110 245.2-245.2S380.4 0 245.2 0zm0 465.9c-121.7 0-220.7-99-220.7-220.7s99-220.7 220.7-220.7 220.7 99 220.7 220.7-99 220.7-220.7 220.7z"/>
                        <path d="M309.4 185.5l-94 93.5-34.3-34.5c-4.8-4.8-12.5-4.8-17.3-.1-4.8 4.7-4.8 12.5-.1 17.3l42.9 43.2c2.4 2.4 5.5 3.6 8.7 3.6 3.1 0 6.2-1.2 8.6-3.6l102.7-102.1c4.8-4.8 4.8-12.5.1-17.3-4.8-4.8-12.5-4.8-17.3 0z"/>
                    </svg>
                </ng-template>
                
                <ng-template ngSwitchCase="error">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 490.4 490.4">
                        <path d="M245.2 490.4c135.2 0 245.2-110 245.2-245.2S380.4 0 245.2 0 0 110 0 245.2s110 245.2 245.2 245.2zm0-465.9c121.7 0 220.7 99 220.7 220.7s-99 220.7-220.7 220.7-220.7-99-220.7-220.7 99-220.7 220.7-220.7z"/>
                        <path d="M180.3 310.1c2.4 2.4 5.5 3.6 8.7 3.6s6.3-1.2 8.7-3.6l47.6-47.6 47.6 47.6c2.4 2.4 5.5 3.6 8.7 3.6s6.3-1.2 8.7-3.6c4.8-4.8 4.8-12.5 0-17.3l-47.8-47.6 47.6-47.6c4.8-4.8 4.8-12.5 0-17.3s-12.5-4.8-17.3 0l-47.6 47.6-47.6-47.6c-4.8-4.8-12.5-4.8-17.3 0s-4.8 12.5 0 17.3l47.6 47.6-47.6 47.6c-4.8 4.8-4.8 12.5 0 17.3z"/>
                    </svg>
                </ng-template>
                
                <ng-template ngSwitchCase="warning">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 294.951 294.951">
                        <path d="M147.475 103.102c-5.22 0-8.7 3.48-8.7 8.7v62.645c0 5.22 3.48 8.7 8.7 8.7 5.22 0 8.7-3.48 8.7-8.7v-62.644c0-5.22-3.48-8.7-8.7-8.7zm5.22 109.628c-3.48-3.48-8.7-3.48-12.18 0-1.74 1.74-1.74 5.22-1.74 6.96 0 3.48 0 5.22 1.74 6.96 1.74 1.74 5.22 1.74 6.96 1.74 1.74 0 5.22 0 3.48-1.74 1.74-1.74 3.48-5.22 3.48-6.96 0-3.48 0-5.22-1.74-6.96z"/>
                        <path d="M288.425 214.47L185.758 35.238c-6.96-13.92-22.62-22.62-38.283-22.62-15.66 0-29.582 8.7-38.283 22.62L6.525 214.47c-8.7 13.92-8.7 31.322 0 45.243 6.96 13.92 22.62 22.62 38.283 22.62h205.334c17.4 0 31.322-8.7 38.283-22.62 8.7-13.92 8.7-31.322 0-45.243zm-13.92 38.283c-3.48 8.7-12.182 13.92-22.622 13.92H44.808c-8.7 0-17.4-5.22-22.62-13.92-5.22-8.7-5.22-19.14 0-27.842L124.853 45.68c3.48-8.7 12.18-13.92 22.62-13.92 10.442 0 19.142 5.22 24.363 13.92l102.668 179.23c5.22 8.7 5.22 19.142 0 27.843z"/>
                    </svg>
                </ng-template>
                
                <ng-template ngSwitchCase="info">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65 65">
                        <path d="M32.5 0C14.58 0 0 14.58 0 32.5S14.58 65 32.5 65 65 50.42 65 32.5 50.42 0 32.5 0zm0 61C16.785 61 4 48.215 4 32.5S16.785 4 32.5 4 61 16.785 61 32.5 48.215 61 32.5 61z"/>
                        <circle cx="33.018" cy="19.541" r="3.345"/>
                        <path d="M32.137 28.342c-1.104 0-2 .896-2 2v17c0 1.104.896 2 2 2s2-.896 2-2v-17c0-1.105-.896-2-2-2z"/>
                    </svg>
                </ng-template>
            </div>
            
            <div class="jaspero__dialog-title">
                {{type}}!
            </div>
            <div class="jaspero__dialog-content">
                {{incomingData.message}}
            </div>
            <div class="jaspero__dialog-actions">
                <button type="button" class="default" *ngIf="incomingData.showCloseButton" (click)="closeSelf()">Close</button>
            </div>
        </div>
    `,
    styles: [`
        :host {
            display: block;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-flow: column;
            flex-flow: column;
            -ms-flex-pack: center;
            justify-content: center;
            -ms-flex-align: center;
            align-items: center;
            position: fixed;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            z-index: 108;
            pointer-events: auto;
        }

        .jaspero__overlay {
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: rgba(141, 150, 165, 0.71);
            transform: translateZ(0);
            opacity: 0;
            transition: all .5s cubic-bezier(.35,0,.25,1);
            position: fixed;
            z-index: 109;
        }

        .jaspero__dialog {
            min-width: 300px;
            max-width: 400px;
            max-height: 50%;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-flow: column;
            flex-flow: column;
            overflow: hidden;
            position: relative;
            z-index: 110;
            outline: none;
            border-radius: 2px;
            opacity: 0;
            box-shadow: 0 7px 9px -4px rgba(0,0,0,.2), 0 14px 21px 2px rgba(0,0,0,.14), 0 5px 26px 4px rgba(0,0,0,.12);
            -ms-transform: scale(.9,.85);
            transform: scale(.9,.85);
            -ms-transform-origin: center center;
            transform-origin: center center;
            transition: opacity .4s cubic-bezier(.25,.8,.25,1),transform .4s cubic-bezier(.25,.8,.25,1) .05s;
            will-change: opacity,transform;
            background-color: #fff;
            color: rgba(0, 0, 0, .87);
        }

        .jaspero__dialog-icon {
            padding: 40px 20px 0;
            text-align: center;
        }
        .jaspero__dialog-icon svg {
            width: 80px;
            height: 80px;
        }

        .jaspero__dialog-icon svg path {
            fill: white;
        }

        .jaspero__dialog-title {
            font-size: 24px;
            letter-spacing: .005em;
            line-height: 26px;
            margin-bottom: 20px;
            padding: 20px 20px 0;
            text-transform: capitalize;
            text-align: center;
            font-weight: 500;
        }

        .jaspero__dialog-content {
            padding: 0 20px 30px;
            -ms-flex: 1;
            flex: 1;
            overflow: auto;
            position: relative;
            text-align: center;
            font-weight: 400;
        }

        .jaspero__dialog-actions {
            min-height: 45px;
            padding: 0;
            display: -ms-flexbox;
            display: flex;
            -ms-flex-align: center;
            align-items: center;
            -ms-flex-pack: end;
            justify-content: flex-end;
            position: relative;
        }

        .jaspero__dialog-actions button {
            width: 100%;
            min-height: 45px;
            margin: 0;
            padding: 0 16px;
            display: inline-block;
            position: relative;
            overflow: hidden;
            outline: none;
            -webkit-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
            cursor: pointer;
            background: rgba(141, 150, 165, 0.2);
            border: 0;
            border-radius: 2px;
            transition: all .4s cubic-bezier(.25,.8,.25,1);
            color: currentColor;
            font-family: inherit;
            font-size: 14px;
            font-style: inherit;
            font-variant: inherit;
            font-weight: 500;
            letter-spacing: inherit;
            line-height: 45px;
            text-align: center;
            text-transform: uppercase;
            text-decoration: none;
            vertical-align: top;
            white-space: nowrap;
        }

        .jaspero__dialog-actions button.default {
            color: inherit;
        }

        .jaspero__dialog-actions button.default:hover {
            background-color: rgba(141, 150, 165, 0.15);
        }

        .jaspero__dialog-actions button.primary {
            background-color: #ec4a1d;
            color: white;
        }

        .jaspero__dialog-actions button.primary:hover {
            background-color: #1e88e5;
        }

        .jaspero__dialog-actions button.raised {
            box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
        }

        :host(.success) .jaspero__dialog-icon svg path {fill: #17A398}
        :host(.error) .jaspero__dialog-icon svg path {fill: #D64550}
        :host(.warning) .jaspero__dialog-icon svg path {fill: #FFC857}
        :host(.info) .jaspero__dialog-icon svg path, :host(.info) .jaspero__dialog-icon svg circle {fill: #8FBFE0}
    `],
    animations: [
        trigger('overlayAn', [
            state('void', style({opacity: 0})),
            state('leave', style({opacity: 0})),
            state('enter', style({opacity: 1})),
            transition('void => enter', animate('400ms cubic-bezier(.25,.8,.25,1)')),
            transition('enter => leave', animate('400ms cubic-bezier(.25,.8,.25,1)'))
        ]),
        trigger('wrapperAn', [
            state('void', style({opacity: 0, transform: 'scale(0.75, 0.75) translate(0, 0)'})),
            state('leave', style({opacity: 0, transform: 'scale(0.75, 0.75) translate(0, 0)'})),
            state('enter', style({opacity: 1, transform: 'scale(1, 1) translate(0, 0)'})),
            transition('void => enter', animate('450ms cubic-bezier(.5, 1.4, .5, 1)')),
            transition('enter => leave', animate('450ms cubic-bezier(.5, 1.4, .5, 1)'))
        ])
    ]
})
export class AlertComponent implements OnInit {
    constructor(
        private _injector: Injector,
        private _ngZone: NgZone
    ) {}

    animationState = 'enter';

    @Output() close: EventEmitter<any> = new EventEmitter();
    @HostBinding('class') type: AlertType;

    incomingData: any = {
        message: '',
        overlay: true,
        overlayClickToClose: true,
        showCloseButton: true,
        duration: 0
    };

    ngOnInit() {
        this.type = this._injector.get('type');
        for (let key in this.incomingData) this.incomingData[key] = this._injector.get(key);

        if (this.incomingData.duration) {
            this._ngZone.runOutsideAngular(() =>
                setTimeout(() =>
                    this._ngZone.run(() =>
                        this.closeSelf()
                    ),
                    this.incomingData.duration
                )
            )
        }
    }

    closeSelf() {
        this.animationState = 'leave';
        this.close.emit(Object.assign({close: true}, this.incomingData))
    }

    overlayClick() {
        if (!this.incomingData.overlayClickToClose) return;
        this.closeSelf();
    }
}