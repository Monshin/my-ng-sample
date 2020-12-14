import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundComponent } from '../component/notfound/notfound.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NotFoundComponent],
  exports: [NotFoundComponent],
})
export class MyComponentModule {
  static forRoot(): ModuleWithProviders<MyComponentModule> {
    return { ngModule: MyComponentModule };
  }
}
