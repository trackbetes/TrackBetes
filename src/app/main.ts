import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

//retrieve a single node from firebase database
import 'rxjs/add/operator/take';

platformBrowserDynamic().bootstrapModule(AppModule);
