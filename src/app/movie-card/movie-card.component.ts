import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent {
  movies: any[] = [];
  favoriteMovies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
    });
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
      this.favoriteMovies = resp;
      console.log(this.favoriteMovies);
    });
  }

  addToFavorite(movieId: string): void {
    console.log(movieId);
    this.fetchApiData.addFavoriteMovie(movieId).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Movie has been added to your favorites.', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  removeFromFavorite(movieId: string): void {
    console.log(movieId);
    this.fetchApiData.removeFavoriteMovie(movieId).subscribe((result) => {
      console.log(result);
      this.snackBar.open('Movie has been removed from your favorites.', 'OK', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  movieIsFavorite(movieId: string): boolean {
    return this.favoriteMovies.includes(movieId);
  }

  toggleFavorite(movieId: string): void {
    if (this.movieIsFavorite(movieId)) {
      this.removeFromFavorite(movieId);
    } else {
      this.addToFavorite(movieId);
    }
  }

  openGenre(movie: any): void {
    const { Name, Description } = movie.Genre;
    this.dialog.open(GenreComponent, {
      data: { Name, Description },
      panelClass: 'genre-dialog-background',
      width: '400px',
    });
  }

  openDirector(movie: any): void {
    const { Name, Birth, Bio } = movie.Director;
    this.dialog.open(DirectorComponent, {
      data: { Name, Birth, Bio },
      panelClass: 'director-dialog-background',
      width: '400px',
    });
  }

  openMovieDetails(movie: any): void {
    const { Name, Description } = movie;
    this.dialog.open(MovieDetailsComponent, {
      data: { Name, Description },
      panelClass: 'synopsis-dialog-background',
      width: '400px',
    });
  }
}
