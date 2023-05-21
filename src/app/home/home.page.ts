import { Component, OnInit } from '@angular/core';
import { OrmService } from '../services/orm.service';
import { IonicModule, ModalController } from '@ionic/angular';
import { PostService } from '../services/post.service';
import { Post } from '../entities/author/post';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule],
  standalone: true
})
export class HomePage implements OnInit {

  posts: Post[] = [];

  constructor(private ormService: OrmService,
    private postService: PostService,
    private modalCtrl: ModalController) {
  }
  ngOnInit(): void {

    this.initOrmService().then(async () => {
      if (!this.ormService.isOrmService) {
        throw new Error(`Error: TypeOrm Service didn't start`);
      } else {
        this.getPosts();
      }
    });

  }

  /**
 * Initialize the TypeOrm service
 */
  async initOrmService() {
    try {
      await this.ormService.initialize();
      console.log(`*** ORM service has been initialized ***`)

    } catch (err: any) {
      const msg = err.message ? err.message : err
      throw new Error(`Couldn't initialize ORM service: ${msg}`);
    }
  }

  async insertDummyPost() {
    const newP = {
      title: this.makeid(15),
      text: this.makeid(75)
    }
    const post = await this.postService.save(newP);
    console.log("Inserted post : ", post);
    this.getPosts();
  }

  async getPosts() {
    const ret = await this.postService.getAllPosts() as Post[];
    this.posts = [...ret];
    console.log("Posts now: ", this.posts);

  }

  async deletePost(id: number) {
    const count = await this.postService.deletePostById(id);
    console.log("DELETE RES : ", count);

    this.getPosts();
    return count;
  }

  async deletePosts() {
    await this.postService.deleteAll();
    this.getPosts();
  }

  makeid(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

}
