import { Controller, Get, Post, Param, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { Quotes } from "./quotes";
import { randomInt } from 'crypto';
@Controller()

export class AppController {
  constructor(private readonly appService: AppService) {}

  
  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }
  
  @Get("/quotes")
  @Render('quotes')
  GetQuotes() {
    return {
      Quotes
    }
  }

  @Get("/randomQuote")
  @Render('randomQuote')
  GetRandomQuote() {
    return {
      randomquote: Quotes.quotes[randomInt(1, Quotes.limit+1)]
    } 
  }

  @Get("/topAuthors")
  @Render('topAuthors')
  GetTopAuthors(){
    let authors = new Map<string,number>();
    Quotes.quotes.forEach(element => {
      if(authors.has(element.author)) {
        authors.set(element.author,authors.get(element.author)+1)
      } else{
        authors.set(element.author,1)
      }
    });
    authors = new Map([...authors.entries()].sort((a , b) => b[1] - a[1]));
    return {
      authors
    }
  }

  @Get('quotes/:id')
  @Render("onequote")
  oneQuote(@Param('id') id: string) {
    const quote = Quotes.quotes.find(element => element.id === parseInt(id))  
    if (quote) {
      console.log(quote)
      return { squote: quote }
    }
    return { squote: null }
  }

  @Get('deletequote/:id')
  @Render("deletequote")
  deleteQuote(@Param('id') id: string) {
    if (Quotes.quotes.includes(Quotes.quotes[parseInt(id)-1])) {
      Quotes.quotes.splice(parseInt(id)-1);
      return { response: "Sikeres törlés"}
    } else {
      return {response: "Nincs ilyen elem"}
    }
  }
}
