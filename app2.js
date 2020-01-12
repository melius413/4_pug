const express = require('express');
const app = express();
const port = 3000;
const host = '127.0.0.1';

app.listen(port, () => {
    console.log(`http://${host}:${port}`);
});

app.set('view engine', 'pug');
app.set('views', './views');
app.use('/', express.static('./public'));

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.locals.pretty = true;

/* Router */
const pugRouter = require("./router/pug");
const apiRouter = require("./router/api");
app.use('/pug', pugRouter);
app.use('/api', apiRouter);

// mysql2 모듈 버전
app.get("/sqltest", async (req, res) => { // 비동기 쓸수 있다는 뜻 async
    let sql = 'INSERT INTO board SET title=?, writer=?, wdate=?';
    let sqlVals = ["테스트", "개발자", "2020-01-05 15:55:00"];
    const connect = await pool.getConnection();
    const result = await connect.query(sql, sqlVals);
    connect.release(); // pool에게 돌려주기(반납)
    res.json(result);
});