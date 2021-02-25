import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {EmailService} from './email.service';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @ViewChild('buttonNo') buttonNoElement: ElementRef<HTMLDialogElement>;
  success = false;

  howManyNo = 0;

  howManyNoSubscribe = new Subject();

  manyMessages = 0;

  constructor(private emailService: EmailService) {
  }

  ngOnInit(): void {
    this.howManyNoSubscribe.subscribe(value => {
      if (value > 10) {
        if (this.manyMessages > 0) {
          alert('YAA DI QUE SI! ACEPTAA NO MA!');
        } else {
          alert('PARECE QUE DE VERDAD NO QIERES SER SU NOVIA :C, Bueno, dejare el boton quieto.');
        }
        this.howManyNo = 0;
        this.howManyNoSubscribe.next(this.howManyNo);
        this.buttonNoElement.nativeElement.style.top = undefined;
        this.buttonNoElement.nativeElement.style.left = undefined;
        this.manyMessages++;
      }
    });
  }

  move(): void {
    const top = Math.random() * (400 - 1) + 1;
    const bottom = Math.random() * (609 - 1) + 1;
    this.buttonNoElement.nativeElement.style.top = `${top}px`;
    this.buttonNoElement.nativeElement.style.left = `${bottom}px`;
    this.howManyNo++;
    this.howManyNoSubscribe.next(this.howManyNo);
  }

  async yes(): Promise<void> {
    await this.emailService.sendEmail('saith_alexa@outlook.es',
      'ACEPTASTE SER LA NOVIA DE LUIS FARFAN! FELICIDADES!', 'Saith Lopez').toPromise();
    await this.emailService.sendEmail('lucho.farfan9@gmail.com', 'SAITH ACEPTO SER TU NOVIA! FELICIDADES!', 'Luis Farfan').toPromise();
    this.success = true;
    setTimeout(async () => {
      await this.emailService.sendEmail('saith_alexa@outlook.es',
        'ACEPTASTE SER LA NOVIA DE LUIS FARFAN! FELICIDADES!', 'Saith Lopez').toPromise();
    }, 2000);
  }

}
