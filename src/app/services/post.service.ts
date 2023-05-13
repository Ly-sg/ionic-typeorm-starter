import { Injectable } from '@angular/core';
import { DataSource, Repository } from 'typeorm';
import { Post } from '../entities/author/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  public dataSource!: DataSource;
  private postRepository!: Repository<Post>
  public database!: string;

  constructor() { }

  /**
 * Initialize the author-post service
 * @returns
 */
  async initialize(): Promise<void> {
    console.log(`@@@ this.dataSource.isInitialized: ${this.dataSource.isInitialized} @@@@`)
    if (this.dataSource.isInitialized) {
      this.postRepository = this.dataSource.getRepository(Post);
    } else {
      return Promise.reject(`Error: PostDataSource not initialized`)
    }
  }

  /**
* Get all Posts
* @returns
*/
  async getAllPosts(): Promise<any> {
    try {
      const posts: Post[] = await this.postRepository
        .createQueryBuilder("posts")
        //.innerJoinAndSelect('post.author', 'author')
        //.innerJoinAndSelect('post.categories','category')
        .getMany();
      console.log("Got All posts : ", posts);
      return posts;

    } catch (err: any) {
      const msg = err.message ? err.message : err;
      return Promise.reject(`Error getAllPosts: ${msg}`);
    }
  }

  async save(postJson: Post | any) {
    return await this.postRepository.save(postJson);
  }

  async deletePostById(id: number) {
    return await this.postRepository.delete(id);
  }

  async deleteAll() {
    return await this.postRepository.createQueryBuilder('post')
      .delete()
      .from(Post)
      .execute()
  }
}
