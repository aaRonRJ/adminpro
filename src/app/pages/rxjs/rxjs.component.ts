import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  subscription: Subscription;

  constructor() {
    this.subscription = this.regresaObservable()
    // .pipe(retry(2))
    .subscribe(
      numero => console.log('Subs', numero),
      error => console.error('Error en el obs', error),
      () => console.log('El obs terminó')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La página RxJS se cerrará');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable( observer => {
      let contador = 0;

      const intervalo = setInterval( () => {
        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next(salida);

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete(); // Finalizar observable.
        // }

        // if (contador === 2) {
          // clearInterval(intervalo);
          // observer.error('Auxilio');
        // }
      }, 1000);
    })
    .pipe(
      map((resp: any) => resp.valor ),
      filter((resp, index) => {
        if ((resp % 2) === 1) {
          // impar
          return true;
        } else {
          // par
          return false;
        }
      })
    );
  }
}
