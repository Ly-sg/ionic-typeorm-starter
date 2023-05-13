import { Injectable } from '@angular/core';
import { SQLiteService } from './sqlite.service';
//import UserDataSource from '../data-sources/UserDataSource';
import { DataSource, Migration, MigrationInterface } from 'typeorm';
import { PostService } from './post.service';
import PostDataSource from '../datasources/PostDataSource';

@Injectable()
export class OrmService {
  isOrmService: Boolean = false;

  constructor(private sqliteService: SQLiteService,
    private postService: PostService) {};

  // Private functions
  /**
   * Initialize the TypeOrm Service
   */
  async initialize(): Promise<void> {
    try {
      // Check connections consistency
      await this.sqliteService.checkConnectionConsistency();

      // Loop through your DataSources
      for (const dataSource of [/*UserDataSource,*/ PostDataSource]) {
        console.log("DATASOURCE:  ", dataSource);
        
        const database = String(dataSource.options.database);
        if (!dataSource.isInitialized) {
          // initialize the DataSource
          await dataSource.initialize();
          console.log(`*** dataSource has been initialized ***`)
          // run the migrations
          await dataSource.runMigrations();
          console.log(`*** dataSource runMigration has been run succesfully ***`)
          // load the data for this datasource
          console.log("DATABASE : ", database);
          
          if (database.includes('post')) {
            this.postService.database = database;
            this.postService.dataSource = dataSource;
            await this.postService.initialize();
            console.log(`*** postService has been initialized ***`)
          }
          if (this.sqliteService.getPlatform() === 'web') {
            // save the databases from memory to store
            await this.sqliteService.getSqliteConnection().saveToStore(database);
            console.log(`*** inORMService saveToStore ***`)
          }

        }
        console.log(`DataSource: ${database} initialized`);
      }

      this.isOrmService = true;
    }  catch (err) {
      console.log(`Error: ${err}`);
    }
  }
}

