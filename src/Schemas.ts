import * as Knex from 'knex'

export enum PostgresDataType {
  Single = 'real',
  Double = 'double precision',
}

export class Schemas {
  private static autoUpdateSQL = "CREATE OR REPLACE FUNCTION update_updated_at_column()\n RETURNS TRIGGER AS $$ \nBEGIN \n   IF row(NEW.*) IS DISTINCT FROM row(OLD.*) THEN\n      NEW.updated_at = now();\n      RETURN NEW;\n   ELSE\n      RETURN OLD;\n   END IF;\nEND;\n$$ language 'plpgsql';"
  private static dropFunction = 'DROP FUNCTION update_updated_at_column();'

  public static createAutoUpdatedAtTimestampTrigger(knex: Knex) {
    return knex.raw(this.autoUpdateSQL)
  }

  public static dropAutoUpdatedAtTimestampTrigger(knex: Knex) {
    return knex.raw(this.dropFunction)
  }

  public static addAutoUpdatedAtTimestampTriggerForTable(knex: Knex, tableName: string) {
    return knex.raw(
      'CREATE TRIGGER update_' +
        tableName +
        '_updated_at BEFORE UPDATE ON ' +
        tableName +
        ' FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();'
    )
  }

  public static changeColumnType(knex: Knex, table: string, column: string, newType: PostgresDataType) {
    return knex.raw('ALTER TABLE "' + table + '" ALTER COLUMN "' + column + '" TYPE ' + newType + '')
  }

  public static dropTableCascade(knex: Knex, tableName: string) {
    return knex.raw('DROP TABLE ' + tableName + ' CASCADE')
  }

  // public static alterConstraint(knex: Knex, table: string, constraintName: string) {
  //
  //   const sql = 'begin;\n' +
  //     '\n' +
  //     'alter table ' + table + '\n' +
  //     'drop constraint ' + constraintName + ';\n' +
  //     '\n' +
  //     'alter table ' + table + '\n' +
  //     'add constraint ' + constraintName + '\n' +
  //     'foreign key (customer_id)\n' +
  //     'references customers (id)\n' +
  //     'on delete cascade;\n' +
  //     '\n' +
  //     'commit;'
  //
  // }

  public static createStandardTable(knex: Knex, tableName: string, builder: (t: Knex.TableBuilder) => void) {
    return knex.schema.createTable(tableName, t => {
      t.increments('id').primary()
      t.timestamps(false, true)

      t.boolean('deleted').notNullable().defaultTo(false)

      builder(t)
    })
  }
}
