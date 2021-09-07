import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  public search!: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  onSubmit(search: string) {
      this.router.navigate(['search', search]);

  }

}
