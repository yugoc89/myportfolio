sudo apt-get update
sudo apt-get -y install mysql-server-5.5 php5-mysql apache2 php5

sudo debconf-set-selections <<< 'mysql-server-5.5 mysql-server/root_password password mypass'
sudo debconf-set-selections <<< 'mysql-server-5.5 mysql-server/root_password_again password mypass' 
sudo apt-get update sudo apt-get -y install mysql-server-5.5 php5-mysql apache2 php5 php5-dev php-pear build-essential 
mkdir /var/log/xdebug 
chown www-data:www-data /var/log/xdebug 
sudo pecl install xdebug 

if [ ! -h /var/www ];  
then
    echo '' >> /etc/php5/apache2/php.ini
    echo ';;;;;;;;;;;;;;;;;;;;;;;;;;' >> /etc/php5/apache2/php.ini
    echo '; Added to enable Xdebug ;' >> /etc/php5/apache2/php.ini
    echo ';;;;;;;;;;;;;;;;;;;;;;;;;;' >> /etc/php5/apache2/php.ini
    echo '' >> /etc/php5/apache2/php.ini
    echo 'zend_extension="'$(find / -name 'xdebug.so' 2>> /dev/null)'"' >> /etc/php5/apache2/php.ini
    echo 'xdebug.default_enable = 1' >> /etc/php5/apache2/php.ini
    echo 'xdebug.idekey = "vagrant"' >> /etc/php5/apache2/php.ini
    echo 'xdebug.remote_enable = 1' >> /etc/php5/apache2/php.ini
    echo 'xdebug.remote_autostart = 0' >> /etc/php5/apache2/php.ini
    echo 'xdebug.remote_port = 9000' >> /etc/php5/apache2/php.ini
    echo 'xdebug.remote_handler=dbgp' >> /etc/php5/apache2/php.ini
    echo 'xdebug.remote_log="/var/log/xdebug/xdebug.log"' >> /etc/php5/apache2/php.ini
    echo 'xdebug.remote_host=192.168.10.10 ; IDE-Environments IP, from vagrant box.' >> /etc/php5/apache2/php.ini
fi

if [ ! -d /var/www/html/wp-admin ];
then
    cd /var/www/html
    wget http://wordpress.org/latest.tar.gz  
    tar xvf latest.tar.gz 
    mv wordpress/* ./  
    rmdir ./wordpress/  
    rm -f latest.tar.gz
fi

if [ ! -f /var/log/databasesetup ];
then
    sudo /etc/init.d/mysql stop
    sudo /usr/sbin/mysqld --skip-grant-tables --skip-networking &
    mysql -u root
    mysql -u root -pmypass -e "CREATE DATABASE wordpress;"
    mysql -u root -pmypass -e "CREATE USER 'mywpuser'@'localhost' IDENTIFIED BY 'mywppass';"
    mysql -u root -pmypass -e "GRANT ALL PRIVILEGES ON wordpress.* TO 'mywpuser'@'localhost';"
    mysql -u root -pmypass -e "FLUSH PRIVILEGES;"
    sudo /etc/init.d/mysql start
    sudo touch /var/log/databasesetup
fi