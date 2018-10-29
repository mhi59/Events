export class Model {

    public static fromJson(json: Object): Model {
        return new Model(
            json['id'],
            json['theme'],
            json['sousTheme'],
            json['date'],
            json['info']
        );
    }

    constructor(public id: string,
            public theme: string,
            public sousTheme: string,
            public date: Date,
            public info: string) {}
}
