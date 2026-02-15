// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';

// interface LanguageOption {
//   code: string;
//   label: string;
// }

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
//   userText = '';
//   translatedText = '';
//   loading = false;

//   // Default languages
//   sourceLang = 'en';
//   targetLang = 'hi';

//   // Supported languages
//   languages: LanguageOption[] = [
//     { code: 'en', label: 'English' },
//     { code: 'hi', label: 'Hindi' },
//     { code: 'es', label: 'Spanish' },
//     { code: 'fr', label: 'French' },
//     { code: 'de', label: 'German' },
//     // Add more as needed
//   ];

//   constructor(private http: HttpClient) {}

//   translate() {
//     if (!this.userText.trim()) {
//       alert('Please enter some text!');
//       return;
//     }

//     this.loading = true;
//     this.translatedText = '';

//   const payload = {
//   text: this.userText,
//   src_lang: this.sourceLang,   // must match backend
//   tgt_lang: this.targetLang    // must match backend
// };


//     this.http.post<any>('http://127.0.0.1:8000/translate', payload).subscribe({
//       next: (res) => {
//         this.translatedText = res.translated_text;
//         this.loading = false;
//       },
//       error: (err) => {
//         alert('Error calling API: ' + err.message);
//         this.loading = false;
//       }
//     });
//   }
// }

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  userText = '';
  translatedText = '';
  loading = false;

  // Fixed languages
  sourceLang = 'en';
  targetLang = 'de';

  // Only German allowed
  languages = [
    { code: 'de', label: 'German' }
  ];

  constructor(private http: HttpClient) {}

  translate() {

    if (!this.userText.trim()) {
      alert('Please enter some text!');
      return;
    }

    this.loading = true;
    this.translatedText = '';

    // Backend now expects ONLY text
    const payload = {
      text: this.userText
    };

    this.http.post<any>(`${environment.apiUrl}/translate`, payload)
      .subscribe({
        next: (res) => {
          this.translatedText = res.translated_text;
          this.loading = false;
        },
        error: (err) => {
          alert('Error calling API: ' + err.message);
          this.loading = false;
        }
      });

  }
}


// for only english to all
// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../environments/environment';

// interface LanguageOption {
//   code: string;
//   label: string;
// }

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
//   userText = '';
//   translatedText = '';
//   loading = false;

//   sourceLang = 'en';   // Keep English as default and fixed
// targetLang = 'hi';   // Users can change this

// languages: LanguageOption[] = [
//   // Only target languages are selectable, source is fixed to English
//   { code: 'hi', label: 'Hindi' },
//   { code: 'es', label: 'Spanish' },
//   { code: 'fr', label: 'French' },
//   { code: 'de', label: 'German' },
// ];


//   // sourceLang = 'en';
//   // targetLang = 'hi';

//   // languages: LanguageOption[] = [
//   //   { code: 'en', label: 'English' },
//   //   { code: 'hi', label: 'Hindi' },
//   //   { code: 'es', label: 'Spanish' },
//   //   { code: 'fr', label: 'French' },
//   //   { code: 'de', label: 'German' },
//   // ];

//   constructor(private http: HttpClient) {}

//   translate() {
//     if (!this.userText.trim()) {
//       alert('Please enter some text!');
//       return;
//     }

//     this.loading = true;
//     this.translatedText = '';

//     const payload = {
//       text: this.userText,
//       src_lang: this.sourceLang,
//       tgt_lang: this.targetLang
//     };

//     this.http.post<any>(`${environment.apiUrl}/translate`, payload).subscribe({
//       next: (res) => {
//         this.translatedText = res.translated_text;
//         this.loading = false;
//       },
//       error: (err) => {
//         alert('Error calling API: ' + err.message);
//         this.loading = false;
//       }
//     });
//   }
// }


// for all languages 

// import { Component } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { environment } from '../environments/environment';

// interface LanguageOption {
//   code: string;
//   label: string;
// }

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent {
//   userText = '';
//   translatedText = '';
//   loading = false;

// //   sourceLang = 'en';   // Keep English as default and fixed
// // targetLang = 'hi';   // Users can change this

// // languages: LanguageOption[] = [
// //   // Only target languages are selectable, source is fixed to English
// //   { code: 'hi', label: 'Hindi' },
// //   { code: 'es', label: 'Spanish' },
// //   { code: 'fr', label: 'French' },
// //   { code: 'de', label: 'German' },
// // ];


//   sourceLang = 'en';
//   targetLang = 'hi';

//   languages: LanguageOption[] = [
//     { code: 'en', label: 'English' },
//     { code: 'hi', label: 'Hindi' },
//     { code: 'es', label: 'Spanish' },
//     { code: 'fr', label: 'French' },
//     { code: 'de', label: 'German' },
//   ];

//   constructor(private http: HttpClient) {}

//   translate() {
//     if (!this.userText.trim()) {
//       alert('Please enter some text!');
//       return;
//     }

//     this.loading = true;
//     this.translatedText = '';

//     const payload = {
//       text: this.userText,
//       src_lang: this.sourceLang,
//       tgt_lang: this.targetLang
//     };

//     this.http.post<any>(`${environment.apiUrl}/translate`, payload).subscribe({
//       next: (res) => {
//         this.translatedText = res.translated_text;
//         this.loading = false;
//       },
//       error: (err) => {
//         alert('Error calling API: ' + err.message);
//         this.loading = false;
//       }
//     });
//   }
// }
