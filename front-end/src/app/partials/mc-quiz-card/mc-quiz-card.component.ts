import { Component, inject, Input } from '@angular/core';
import { Quiz } from '../../../services/quiz/quiz-types';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { ButtonComponent } from "../button/button.component";
import { ToastrService } from 'ngx-toastr';
import { Clipboard, ClipboardModule } from '@angular/cdk/clipboard';
import { QrCodeModule } from 'ng-qrcode'
import html2canvas from 'html2canvas'


@Component({
  selector: 'app-mc-quiz-card',
  standalone: true,
  imports: [CommonModule, MarkdownModule, ButtonComponent, ClipboardModule, QrCodeModule],
  templateUrl: './mc-quiz-card.component.html',
  styleUrl: './mc-quiz-card.component.scss'
})
export class McQuizCardComponent {

    @Input() quiz : Quiz | null = null;
    showQrCode : boolean = false;
    showLink : boolean = false;
    routerService = inject(Router);
    toastrService = inject(ToastrService);
    clipBoard = inject(Clipboard)

    onClickSeeDetails(){  
      if(this.quiz){
        this.routerService.navigate([`quiz/view/${this.quiz.id}/outcome`])
      }
    }

    onClickGetLink(){
      if(this.quiz){
        if(this.quiz.link){
          this.clipBoard.copy(this.quiz.link)
          this.toastrService.success("Link copied");
        }
        else{
          console.error("error getting link");
        }
      }
    }

    toggleShowQrCode(){
      if(this.showLink){
        this.toggleShowLink();
      }
      this.showQrCode = !this.showQrCode;
    }

    toggleShowLink(){
      if(this.showQrCode){
        this.toggleShowQrCode();  
      }
      this.showLink = !this.showLink;
    }


    downloadQRCode() {
      const qrCodeElement = document.getElementById('qrCode');
      if(qrCodeElement){
        html2canvas(qrCodeElement).then(canvas => {
          const link = document.createElement('a');
          link.download = 'qr-code.png';
          link.href = canvas.toDataURL();
          link.click();
          this.toastrService.success("QR Code downloaded", "Download success")
        });
      }
    }

    onClickTakeQuiz(){
      if(this.quiz)
      this.routerService.navigate([`quiz/${this.quiz.title}/${this.quiz.id}`])
    }

}
