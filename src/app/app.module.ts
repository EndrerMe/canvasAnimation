// Vendors
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Routers
import { AppRoutingModule } from 'src/app/app-routing.module';
// Components
import { AppComponent } from 'src/app/app.component';
// Services
import { CanvasService } from 'src/app/shared/services/canvas.service';
import { MenuComponent } from 'src/app/shared/directives/menu/menu.component';
// Modules
import { TestAreaModule } from 'src/app/pages/test-area/test-area.module';
import { DotsModule } from './pages/dots/dots.module';
import { SpawnBallsModule } from './pages/spawn-balls/spawn-balls.module';
import { BallsModule } from './pages/balls/balls.module';
import { ParticlesModule } from './pages/particles/particles.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TestAreaModule,
    DotsModule,
    SpawnBallsModule,
    BallsModule,
    ParticlesModule,
  ],
  providers: [
    CanvasService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
