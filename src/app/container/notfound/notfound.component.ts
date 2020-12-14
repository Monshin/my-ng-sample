import {
  Component,
  OnInit,
  Inject,
  Optional,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { MyHelmetService } from 'src/app/service/core/myHelmet.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss'],
})
export class NotFoundComponent implements OnInit {
  title: string = '查無此頁面';

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Optional() @Inject(RESPONSE) private response: any,
    private helmetService: MyHelmetService
  ) {}

  ngOnInit(): void {
    this.helmetService.set({ title: '查無此頁面', disableTitleTemplate: true });
    if (isPlatformServer(this.platformId)) {
      this.response.status(404);
    }
  }
}
