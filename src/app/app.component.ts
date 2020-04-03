import { Component, OnInit } from '@angular/core';

import { fromEvent, interval } from 'rxjs';
import { map, buffer, throttle, filter, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  contador = 0;

  ngOnInit(): void {
    const eventoClick$ = fromEvent(
      document.getElementById('btnclick'),
      'click'
    );
    const debounced$ = eventoClick$.pipe(debounceTime(250));
    const click$ = eventoClick$.pipe(
      buffer(debounced$),
      map((list) => {
        return list.length;
      }),
      filter((x) => {
        return x >= 2;
      })
    );

    click$.subscribe((e) => {
      console.log('doble click');
      this.contador++;
    });
    click$.pipe(debounceTime(2000)).subscribe((_) => {
      document.getElementById('message').innerHTML = this.contador.toString();
    });
  }

  updateResult(type: string) {}
}
// this.button = document.getElementById('link');
// fromEvent(this.button, 'click').subscribe(event => console.log(event));
