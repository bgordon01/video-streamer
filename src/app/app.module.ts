import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { MoviesComponent } from './routes/movies/movies.component';
import { SeriesComponent } from './routes/series/series.component';
import { ContentComponent } from './routes/content/content.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ErrorComponent } from './components/error/error.component';
import { VideoComponent } from './components/video/video.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MoviesComponent,
    SeriesComponent,
    ContentComponent,
    LoaderComponent,
    ErrorComponent,
    VideoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
