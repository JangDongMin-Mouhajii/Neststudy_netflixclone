import { Controller, Get, Delete, Post, Patch, Param, NotFoundException, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { title } from 'process';

interface Movie {
  id: number;
  title: string;
}

@Controller('movie')
export class AppController {

  private movies: Movie[] = [
    {
      id: 1,
      title: '해리포터',
    },
    {
      id: 2,
      title: '반지의 제왕',
    }
  ];

  private idCounter = 3;

  constructor(private readonly appService: AppService) { }

  @Get()
  getMovies() {
    return this.movies;
  }

  @Get(':id')
  getMovie(@Param('id') id: string) {
    const movie = this.movies.find((m) => m.id === +id);

    if (!movie) {
      throw new NotFoundException('존재하지 않는 ID의 영화입니다');
    }

    return movie;
  }

  @Post()
  postMovie(
    @Body('title') title: string,
  ) {
    const movie: Movie = {
      id: this.idCounter++,
      title: title,
    };

    this.movies.push(
      movie
    );

    return movie;
  }

  @Patch(':id')
  patchMovie() {
    return {
      id: 3,
      name: '어벤져스',
      character: ['블랙위도우', '쉬헐크'],
    }
  }

  @Delete(':id')
  deleteMovie() {
    return 3;
  }
}