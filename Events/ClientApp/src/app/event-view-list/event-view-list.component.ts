import { Router } from '@angular/router';
import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { DataService } from '../service/dataService';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal/';

@Component({
  selector: 'app-event-view-list',
  templateUrl: './event-view-list.component.html',
  styleUrls: ['./event-view-list.component.scss']
})
export class EventViewListComponent implements OnInit {
  private _themeActivated = '';
  @Input() theme: string;
  @Input() sousTheme: string;
  @Input() date: string;
  @Input() info: string;
  @Input() id: string;
  @Input() index: number;
  @Input() set themeActivated(theme: string) {  // On reçoit le themeSelected du composant parent eventViewComponent
    this._themeActivated = theme;
  }
  get themeActivated(): string {return this._themeActivated; }


  modalRef: BsModalRef;
  messageConfirmation = '';


  constructor(private dataService: DataService, private router: Router, private modalService: BsModalService) { }


  ngOnInit() {}

  onUpdateEvent() { // On envoie vers la vue update les paramètres de lEvent selectionné
    this.router.navigate(['/update'], {queryParams:
                                        {id: this.id,
                                        theme: this.theme,
                                        sousTheme: this.sousTheme,
                                        date: this.date,
                                        info: this.info }});
  }
  openModal(template: TemplateRef<any>) { // Fenêtre Modal qui gére la supression
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirm(): void { // Si Confirmation de supression on continue le processus de supression
    this.dataService.deleteEventOnServer(this.id, this.themeActivated);
    this.messageConfirmation = 'Event ' + this.sousTheme + ' supprimé';
    setTimeout(() => {
      this.modalRef.hide();
    }, 2000);
  }

  decline(): void {
    this.modalRef.hide();
  }

  getColor() {
    switch (this.theme) {
      case 'rh': return 'rgb(92, 79, 156)';
      case 'marketing': return 'rgb(59, 136, 168)';
      case 'commerce': return 'rgb(211, 7, 119)';
      case 'detente': return 'rgb(118, 4, 66)';
    }
  }

  getColorWithOpacity() {
    switch (this.theme) {
      case 'rh': return 'rgba(92, 79, 156, 0.9)';
      case 'marketing': return 'rgba(59, 136, 168, 0.9)';
      case 'commerce': return 'rgba(211, 7, 119, 0.9)';
      case 'detente': return 'rgba(118, 4, 66, 0.9)';
    }
  }

}


