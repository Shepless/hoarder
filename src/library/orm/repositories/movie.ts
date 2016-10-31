import { TYPES } from '../../../inversify.types';
import { IDatabaseProvider } from '../database-provider';
import { IMovieEntity, MovieEntity } from '../entities/movie';
import { IRepository } from './';
import { inject, injectable } from 'inversify';
import { Repository } from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

@injectable()
export class MovieRepository implements IRepository<IMovieEntity> {
    private repository: Repository<IMovieEntity>;

    constructor( @inject(TYPES.DATABASE_PROVIDER) databaseProvider: IDatabaseProvider) {
        this.repository = databaseProvider.connection.getRepository(MovieEntity);
    }

    findOne(options?: ObjectLiteral) {
        return this.repository.findOne(options);
    }

    find(options: ObjectLiteral) {
        return this.repository.find(options);
    }

    create(object: IMovieEntity) {
        let entity = this.repository.create(object);

        return this.repository.persist(entity);
    }

    update(entity: IMovieEntity) {
        return this.repository.persist(entity);
    }

    remove(entity: IMovieEntity) {
        return this.repository.remove(entity);
    }

    queryBuilder() {
        return this.repository.createQueryBuilder('movie');
    }
}