import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  protected api = 'https://api.emailjs.com/api/v1.0/email/send';

  constructor(private http: HttpClient) {
  }

  sendEmail(to: string, message, to_name): Observable<any> {
    const data = {
      service_id: environment.SERVICE_ID,
      template_id: environment.TEMPLATE_ID,
      user_id: environment.user_id,
      accessToken: environment.token,
      template_params: {
        reply_to: to,
        message,
        to_name
      }
    };
    return this.http.post(this.api, data, {
      headers: new HttpHeaders({'Content-Type': 'application/json'}), responseType: 'text'
    });
  }
}
