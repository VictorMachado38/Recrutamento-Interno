import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {ClientDTO} from "../../model/dto/client.dto";
import {HttpClient} from "@angular/common/http";
import {cpf} from 'cpf-cnpj-validator';
import {cnpj} from 'cpf-cnpj-validator';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError, map} from "rxjs/operators";
import {Observable, of} from "rxjs";
import {MessageService} from "primeng/api";
import {GoogleMapsModule} from "@angular/google-maps";
import {EnderecoDTO} from "../../model/dto/endereco.dto";
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';


@Component({
    selector: 'app-client-form',
    templateUrl: './client-form.component.html',
    styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit, AfterViewInit, AfterViewChecked {

    constructor(private _http: HttpClient,
                private _messageService: MessageService,
                private _route: ActivatedRoute,
                private _location: Location) {
        this.apiLoaded = _http.jsonp('https://maps.googleapis.com/maps/api/js?key=AIzaSyAySnmKfLixyCP1PYecI2VATPrG7kUMseM', 'callback')
            .pipe(
                map(() => true),
                catchError(() => of(false)),
            );
    }

    apiLoaded: Observable<boolean>;
    cliete = new ClientDTO();
    invalName: boolean = false;
    invalCnpj: boolean = false;
    dialogVisible: boolean = false
    markerTitle: any = null;
    selectedPosition: any;
    infoWindow: any;
    draggable: boolean = true;
    options: any;
    overlays: any[] = [];
    marcarNoMapa: boolean = false;
    titlePage: string = 'Client registration';


    ngOnInit(): void {
        const url = this._location.path();
        if (url !== '/form') {
            this.cliete = Object.assign({}, this._route.snapshot.queryParams);
            this.titlePage = 'Client Edition';
        } else {
            this.titlePage = 'Customer registration';
        }

        this.options = {
            center: {lat: -16.688059517919058, lng: -49.26408132103648},
            zoom: 12
        };


        // this.overlays = [
        //     new google.maps.Marker({position: {lat: 36.879466, lng: 30.667648}, title:"Konyaalti"}),
        //     new google.maps.Marker({position: {lat: 36.883707, lng: 30.689216}, title:"Ataturk Park"}),
        //     new google.maps.Marker({position: {lat: 36.885233, lng: 30.702323}, title:"Oldtown"}),
        //     new google.maps.Polygon({paths: [
        //             {lat: 36.9177, lng: 30.7854},{lat: 36.8851, lng: 30.7802},{lat: 36.8829, lng: 30.8111},{lat: 36.9177, lng: 30.8159}
        //         ], strokeOpacity: 0.5, strokeWeight: 1,fillColor: '#1976D2', fillOpacity: 0.35
        //     }),
        //     new google.maps.Circle({center: {lat: 36.90707, lng: 30.56533}, fillColor: '#1976D2', fillOpacity: 0.35, strokeWeight: 1, radius: 1500}),
        //     new google.maps.Polyline({path: [{lat: 36.86149, lng: 30.63743},{lat: 36.86341, lng: 30.72463}], geodesic: true, strokeColor: '#FF0000', strokeOpacity: 0.5, strokeWeight: 2})
        // ];

        // this.overlays = [
        //     new google.maps.Marker({position: {lat: -16.688059517919058, lng: -49.26408132103648}, title: "Konyaalti"}),
        //     new google.maps.Marker({position: {lat: 36.883707, lng: 30.689216}, title: "Ataturk Park"})]

        // this.getCEP("74440-590")
    }

    ngAfterViewInit(): void {
        // this.overlays = [
        //     new google.maps.Marker({position: {lat: -16.703515449819243, lng: -49.25256829507094}, title:"Konyaalti"}),
        // ];
        //

        // this.selectedPosition = {lat: -16.688059517919058, lng: -49.26408132103648}
        // this.overlays.push(new google.maps.Marker({position: {lat: -16.703515449819243, lng: -49.25256829507094}, title:"Konyaalti"}));


    }

    ngAfterViewChecked(): void {
        // this.overlays = [
        //     new google.maps.Marker({position: {lat: -16.703515449819243, lng: -49.25256829507094}, title:"Konyaalti"}),
        // ];
        // this.overlays.push(new google.maps.Marker({position: {lat: -16.703515449819243, lng: -49.25256829507094}, title:"Konyaalti"}));
        //
        // this.overlays.push(new google.maps.Marker({
        //     position: {
        //         lat:-16.703515449819243,
        //         lng: -49.25256829507094
        //     }, title: this.markerTitle, draggable: this.draggable
        // }));
        // this.markerTitle = null;
        // this.dialogVisible = false;

    }

    sendForm() {
        // if()
        if (this.cliete.cnpj === undefined || this.cliete.cnpj === null || this.cliete.cnpj.length < 14) {
            this.invalCnpj = true;
            return;
        }

        this._http.post(`http://localhost:8081/client/save`, this.cliete).subscribe({
            next: (retorno: any) => {
                this.cliete = retorno.data;
                if (retorno.status === 200) {
                    this._messageService.add({
                        severity: 'success',
                        summary: retorno.message,
                        detail: retorno.description
                    });

                } else {
                    this._messageService.add({
                        severity: 'error',
                        summary: 'Error registering client'
                    });
                }
                const data = retorno.data;

            },
            error: (err) => {
                this._messageService.add({
                    severity: 'error',
                    summary: 'Error registering client'
                });
            },
        });


    }

    getCEP(cep: string) {
        // if()


        this._http.get(`https://cdn.apicep.com/file/apicep/` + cep + `.json`).subscribe({
            next: (v: any) => {
                const a = v.address;
                this.cliete.endereco = v.address;
                this.cliete.estado = v.state;
                this.cliete.cidade = v.city;
                this.cliete.setor = v.district;
            },
            error: (err) => {
                // this.erros.push(nome);
            },
        });


    }


    handleMapClick(event: any) {
        this.dialogVisible = true;
        this.selectedPosition = event.latLng;
    }

    handleOverlayClick(event: any) {
        let isMarker = event.overlay.getTitle != undefined;

        if (isMarker) {
            let title = event.overlay.getTitle();
            this.infoWindow.setContent('' + title + '');
            this.infoWindow.open(event.map, event.overlay);
            event.map.setCenter(event.overlay.getPosition());

            this._messageService.add({severity: 'info', summary: 'Marker Selected', detail: title});
        } else {
            this._messageService.add({severity: 'info', summary: 'Shape Selected', detail: ''});
        }
    }

    addMarker() {
        this.overlays.push(new google.maps.Marker({
            position: {
                lat: this.selectedPosition.lat(),
                lng: this.selectedPosition.lng()
            }, title: this.markerTitle, draggable: this.draggable
        }));
        this.markerTitle = null;
        this.dialogVisible = false;
    }

    handleDragEnd(event: any) {
        this._messageService.add({severity: 'info', summary: 'Marker Dragged', detail: event.overlay.getTitle()});
    }

    initOverlays() {
        if (!this.overlays || !this.overlays.length) {
            this.overlays = [
                new google.maps.Marker({position: {lat: 36.879466, lng: 30.667648}, title: "Konyaalti"}),
                new google.maps.Marker({position: {lat: 36.883707, lng: 30.689216}, title: "Ataturk Park"}),
                new google.maps.Marker({position: {lat: 36.885233, lng: 30.702323}, title: "Oldtown"}),
                new google.maps.Polygon({
                    paths: [
                        {lat: 36.9177, lng: 30.7854}, {lat: 36.8851, lng: 30.7802}, {
                            lat: 36.8829,
                            lng: 30.8111
                        }, {lat: 36.9177, lng: 30.8159}
                    ], strokeOpacity: 0.5, strokeWeight: 1, fillColor: '#1976D2', fillOpacity: 0.35
                }),
                new google.maps.Circle({
                    center: {lat: 36.90707, lng: 30.56533},
                    fillColor: '#1976D2',
                    fillOpacity: 0.35,
                    strokeWeight: 1,
                    radius: 1500
                }),
                new google.maps.Polyline({
                    path: [{lat: 36.86149, lng: 30.63743}, {lat: 36.86341, lng: 30.72463}],
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 0.5,
                    strokeWeight: 2
                })
            ];
        }
    }

    zoomIn(map: any) {
        map.setZoom(map.getZoom() + 1);
    }

    zoomOut(map: any) {
        map.setZoom(map.getZoom() - 1);
    }

    clear() {
        this.overlays = [];
    }

    getEndereco($event: any) {
        if (this.cliete.cep?.length === 8 || this.cliete.cep?.length === 7) {
            const cepComHifen = this.cliete.cep.slice(0, 5) + "-" + this.cliete.cep.slice(5);
            cepComHifen.length === 9 && this.getCEP(cepComHifen);
        }
    }

    showSuccess() {
        this._messageService.add({life: 5000, severity: 'custom', summary: 'Success', detail: 'Message Content'});
    }
}
