import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface LanguageOption {
  code: string;
  label: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userText = '';
  translatedText = '';
  loading = false;

  // Default languages
  sourceLang = 'en';
  targetLang = 'hi';

  // Supported languages
  languages: LanguageOption[] = [
    { code: 'en', label: 'English' },
    { code: 'hi', label: 'Hindi' },
    { code: 'es', label: 'Spanish' },
    { code: 'fr', label: 'French' },
    { code: 'de', label: 'German' },
    // Add more as needed
  ];

  constructor(private http: HttpClient) {}

  translate() {
    if (!this.userText.trim()) {
      alert('Please enter some text!');
      return;
    }

    this.loading = true;
    this.translatedText = '';

  const payload = {
  text: this.userText,
  src_lang: this.sourceLang,   // must match backend
  tgt_lang: this.targetLang    // must match backend
};


    this.http.post<any>('http://127.0.0.1:8000/translate', payload).subscribe({
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
