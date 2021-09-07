import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APIResponse, Game } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';
import { MatCarousel, MatCarouselComponent } from 'ng-mat-carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public sort: string;
  public games: Array<Game>;
  private routeSub: Subscription;
  private gameSub: Subscription;
  private display: string;
  public selectValue = 'released';
  public platform = '1';
  public page = 1;
  public mySearch!: string;



  constructor(private httpService: HttpService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe((params: Params) => {
      if (params['game-search']) {
        this.mySearch = params['game-search'];
        this.searchGames(1, '-added', '1', params['game-search']);
      }
      else {
        this.searchGames(1, '-added', '1');
      }
      this.games = params.results;
      console.log(this.games,"elo");
    });
  }

  searchGames(page: number, sort: string, platform: string, search?: string, ): void {
    this.gameSub = this.httpService
      .getGame(page, sort, platform, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games = gameList.results;
        console.log(gameList);
      });
  }

  openGameDetails(id: string): void {
    this.router.navigate(['details', id]);
  }

  ngOnDestroy(): void {
    if (this.gameSub) {
      this.gameSub.unsubscribe();
    }

    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }

  myfunction(index: number|string){
    this.display = index + 'a';
    console.log('yascv');
  }

  moreGame(page: number, sort: string, platform: string, search?: string): void {
    this.gameSub = this.httpService
      .getGame(page, sort, platform, search)
      .subscribe((gameList: APIResponse<Game>) => {
        this.games.push(...gameList.results);

      });
  }
  change_page(page:number){
    return this.page++;
  }

  changement(evenement:any) {
    // Evenement contient l'évènement transmis, on peut accéder à la donnée sélectionnée en manipulant l'attribut target
    let objet = evenement.target.data;
    console.log(evenement);
  }


}
