import { Component, OnInit } from '@angular/core';

import { fromEvent, interval } from 'rxjs';
import { map, buffer, throttle, filter, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
    const eventoClick$ = fromEvent(
      document.getElementById('btnclick'),
      'click'
    );
    console.log(eventoClick$);

    let contador = 0;
    const click$ = eventoClick$.pipe(
      buffer(eventoClick$.pipe(throttle((ev) => interval(250)))),
      map((list) => {
        return list.length;
      }),
      filter((x) => {
        return x >= 2;
      })
    );

    click$.subscribe(() => {
      contador++;
      const numeroClick = document.getElementById('message');
      numeroClick.innerHTML = contador.toString();

      console.log('Diste mas clicks');
      console.log(contador);
    });
  }

  updateResult(type: string) {}
}
// this.button = document.getElementById('link');
// fromEvent(this.button, 'click').subscribe(event => console.log(event));
