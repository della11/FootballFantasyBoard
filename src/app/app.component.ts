import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'fdr11-root',
  standalone: true,
  imports: [
    RouterOutlet, ReactiveFormsModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent implements OnInit {

  matchForm: FormGroup; // Form per inserire i risultati delle partite

  constructor(private fb: FormBuilder)
  {
    this.matchForm = this.fb.group({
      homeScore: [null, Validators.required],
      awayScore: [null, Validators.required]
    });
  }
  title = 'FootballFantasyBoard';

  _baseBoard : Array<any> = [
    { name: 'Inter', points: 82 }, { name: 'Milan', points: 68 }, { name: 'Juventus', points: 62 }, { name: 'Bologna', points: 58 },
    { name: 'Roma', points: 55 }, { name:  'Atalanta', points: 50 }, { name: 'Napoli', points: 48 }, { name: 'Lazio', points: 46 },
    { name: 'Torino', points: 44 }, { name: 'Fiorentina', points: 43 }, { name: 'Monza', points: 42 }, { name: 'Genoa', points: 38 },
    { name: 'Cagliari', points: 30 }, { name: 'Lecce', points: 29 }, { name: 'Udinese', points: 28 }, { name: 'Empoli', points: 28 },
    { name: 'H.Verona', points: 27 }, { name: 'Frosinone', points: 26 }, { name: 'Sassuolo', points: 25 }, { name: 'Salernitana', points: 15 }
  ]
  standings: Array<any> = [ ...this._baseBoard ];

  matchdays: Array<any> = [
    {
    number: 1,
    matches: [
      { home: 'Inter', homeScore: null, away: 'Milan', awayScore: null },
      { home: 'Bologna', homeScore: null, away: 'Juventus', awayScore: null },
      { home: 'Roma', homeScore: null, away: 'Atalanta', awayScore: null },
      { home: 'Napoli', homeScore: null, away: 'Lazio', awayScore: null },
      { home: 'Torino', homeScore: null, away: 'Fiorentina', awayScore: null },
      { home: 'Monza', homeScore: null, away: 'Genoa', awayScore: null },
      { home: 'Cagliari', homeScore: null, away: 'Lecce', awayScore: null },
      { home: 'Udinese', homeScore: null, away: 'Empoli', awayScore: null },
      { home: 'H.Verona', homeScore: null, away: 'Frosinone', awayScore: null },
      { home: 'Sassuolo', homeScore: null, away: 'Salernitana', awayScore: null },
      ]
    },
    {
      number: 2,
      matches: [
        { away: 'Inter', homeScore: null,   home: 'Milan', awayScore: null },
        { away: 'Bologna', homeScore: null, home: 'Juventus', awayScore: null },
        { away: 'Roma', homeScore: null,    home: 'Atalanta', awayScore: null },
        { away: 'Napoli', homeScore: null,  home: 'Lazio', awayScore: null },
        { away: 'Torino', homeScore: null,  home: 'Fiorentina', awayScore: null },
        { away: 'Monza', homeScore: null,   home: 'Genoa', awayScore: null },
        { away: 'Cagliari', homeScore: null,home: 'Lecce', awayScore: null },
        { away: 'Udinese', homeScore: null, home: 'Empoli', awayScore: null },
        { away: 'H.Verona', homeScore: null, home: 'Frosinone', awayScore: null },
        { away: 'Sassuolo', homeScore: null,home: 'Salernitana', awayScore: null },
        ]
    },
    {
      number: 3,
      matches: [
        { home: 'Salernitana', homeScore: null, away: 'Milan', awayScore: null },
        { home: 'Atalanta', homeScore: null, away: 'Juventus', awayScore: null },
        { home: 'Lazio', homeScore: null, away: 'Bologna', awayScore: null },
        { home: 'Fiorentina', homeScore: null, away: 'Roma', awayScore: null },
        { home: 'Genoa', homeScore: null, away: 'Napoli', awayScore: null },
        { home: 'Lecce', homeScore: null, away: 'Torino', awayScore: null },
        { home: 'Empoli', homeScore: null, away: 'Monza', awayScore: null },
        { home: 'Udinese', homeScore: null, away: 'Cagliari', awayScore: null },
        { home: 'H.Verona', homeScore: null, away: 'Sassuolo', awayScore: null },
        { home: 'Frosinone', homeScore: null, away: 'Inter', awayScore: null },
        ]
    },
    {
      number: 4,
      matches: [
        { away: 'Salernitana', homeScore: null, home: 'Milan', awayScore: null },
        { away: 'Atalanta', homeScore: null, home: 'Juventus', awayScore: null },
        { away: 'Lazio', homeScore: null, home: 'Bologna', awayScore: null },
        { away: 'Fiorentina', homeScore: null, home: 'Roma', awayScore: null },
        { away: 'Genoa', homeScore: null, home: 'Napoli', awayScore: null },
        { away: 'Lecce', homeScore: null, home: 'Torino', awayScore: null },
        { away: 'Empoli', homeScore: null, home: 'Monza', awayScore: null },
        { away: 'Udinese', homeScore: null, home: 'Cagliari', awayScore: null },
        { away: 'H.Verona', homeScore: null, home: 'Sassuolo', awayScore: null },
        { away: 'Frosinone', homeScore: null, home: 'Inter', awayScore: null },
        ]
      },
  ]


  // Metodo per l'aggiornamento dinamico dei risultati del match
  updateResult =(match: any) => {
    const homeScore = this.matchForm.value.homeScore;
    const awayScore = this.matchForm.value.awayScore;
    match.homeScore = homeScore;
    match.awayScore = awayScore;

    this.calculateStandings();
  }

  calculateStandings() {
    this.standings = JSON.parse(JSON.stringify(this._baseBoard));

    console.log(this.matchdays);
    for (const matchday of this.matchdays) {
      for (const match of matchday.matches) {
        const homeTeam = this.standings.find(team => team.name === match.home);
        const awayTeam = this.standings.find(team => team.name === match.away);
        if (homeTeam && awayTeam && match.homeScore !== null && match.awayScore !== null) {
          console.log(`${homeTeam.name}, ${awayTeam.name} ,  ${match.homeScore} - ${match.awayScore}`)
          if (match.homeScore > match.awayScore) {
            homeTeam.points += 3;
          } else if (match.homeScore < match.awayScore) {
            awayTeam.points += 3;
          } else {
            homeTeam.points += 1;
            awayTeam.points += 1;
          }
        }
      }
    }
    // Ordina la classifica in base ai punti
    this.standings.sort((a, b) => b.points - a.points);
  }

  getStandingClass(index: number): string {
    switch (index) {
      case 1:
        return 'table-info';
      case 2:
      case 3:
      case 4:
        return 'table-primary';
      case 5:
        return 'table-warning';
      case 6:
        return 'table-success';
      case 18:
      case 19:
      case 20:
        return 'table-danger';
      default: return '';
    }
  }
  //#region  Angular Cycles
  ngOnInit = () =>
  {
    this.standings = this._baseBoard;
  }
  //#endregion
}
