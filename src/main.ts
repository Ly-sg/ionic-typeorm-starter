import { APP_INITIALIZER, enableProdMode, importProvidersFrom } from '@angular/core';

import { environment } from './environments/environment';

import { bootstrapApplication } from '@angular/platform-browser';
import { Capacitor } from '@capacitor/core';
import { defineCustomElements as pwaElements } from '@ionic/pwa-elements/loader';
import { defineCustomElements as jeepSqlite } from 'jeep-sqlite/loader';
import { AppComponent } from './app/app.component';
import { OrmService } from './app/services/orm.service';
import { PostService } from './app/services/post.service';
import { SQLiteService } from './app/services/sqlite.service';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { PreloadAllModules, RouteReuseStrategy, provideRouter, withPreloading } from '@angular/router';
import { APP_ROUTES } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}
// --> Below only required if you want to use a web platform
const platform = Capacitor.getPlatform();
if (platform === "web") {
  // Web platform
  // required for toast component in Browser
  pwaElements(window);

  // required for jeep-sqlite Stencil component
  // to use a SQLite database in Browser
  jeepSqlite(window);

  window.addEventListener('DOMContentLoaded', async () => {
    const jeepEl = document.createElement("jeep-sqlite");
    document.body.appendChild(jeepEl);
    jeepEl.autoSave = true;
  });
}
// Above only required if you want to use a web platform <--

/*platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));*/

export function initializeFactory(init: SQLiteService) {
  return () => init.initializeWebStore();
}

bootstrapApplication(AppComponent, {
  providers: [SQLiteService, OrmService, PostService,
    provideRouter(APP_ROUTES, withPreloading(PreloadAllModules)),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    importProvidersFrom(
      IonicModule.forRoot({})
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeFactory,
      deps: [SQLiteService],
      multi: true
    },
  ],
})
