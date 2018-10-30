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
  @Input() theme: string;
  @Input() sousTheme: string;
  @Input() date: string;
  @Input() info: string;
  @Input() id: string;
  @Input() index: number;
  modalRef: BsModalRef;
  messageConfirmation = '';


  constructor(private dataService: DataService, private router: Router, private modalService: BsModalService) { }


  ngOnInit() {
  }

  onDeleteEvent() {
    this.dataService.deleteEventOnServer(this.id);
  }

  onUpdateEvent() { // On envoie vers la vue update les paramètres de lEvent selectionné
    this.router.navigate(['/update'], {queryParams:
                                        {id: this.id,
                                        theme: this.theme,
                                        sousTheme: this.sousTheme,
                                        date: this.date,
                                        info: this.info }});
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  confirm(): void {
    this.dataService.deleteEventOnServer(this.id);
    this.messageConfirmation = 'Event supprimé';
    this.modalRef.hide();

    setTimeout(() => {
      this.router.navigateByUrl('/blank', {skipLocationChange: true}) // Permet de recharger le composant en restant sur la même page
      .then(() => 
      this.router.navigate(['/events']));
    }, 2000);

  }

  decline(): void {
    this.modalRef.hide();
  }

}


