import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {EmailService} from "./email.service";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @ViewChild('buttonNo') buttonNoElement: ElementRef<HTMLDialogElement>;

  constructor(private emailService: EmailService) {
  }

  ngOnInit(): void {
  }

  move() {
    const top = Math.random() * (400 - 1) + 1;
    const bottom = Math.random() * (609 - 1) + 1;
    this.buttonNoElement.nativeElement.style.top = `${top}px`;
    this.buttonNoElement.nativeElement.style.left = `${bottom}px`;
  }

  async yes(): Promise<void> {
    await this.emailService.sendEmail('lucho.farfan9@gmail.com').toPromise();
    setTimeout(async () => {
      await this.emailService.sendEmail('lfarfanm@everis.com').toPromise();
    }, 2000);
  }

}
