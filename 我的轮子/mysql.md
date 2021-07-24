

### NodeJS MySQL客户端不支持身份验证协议

```mysql
ALTER USER 'root'@'localhost' IDENTIFIED BY 'your new password'; 
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your new password';
```

解决group by的问题 this is incompatible with sql_mode=only_full_group_by

```mysql
#编辑mysql配置文件(windows是my.ini, linux是my.cnf),在 [mysqld]下增加如下配置：
sql_mode ='STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION'
```

