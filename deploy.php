<?php

namespace Deployer;

require 'recipe/common.php';

// Set the default deploy environment to production
set('default_stage', 'staging');
set('satis_username', 'creativeorange'); // will be overwritten in the pipelines
set('satis_password', ''); // will be overwritten in the pipelines

desc('Execute migrations');
task('craft:migrate', function () {
    run('{{release_path}}/craft migrate/up');
})->once();

desc('Execute npm install');
task('npm:install', '{{bin/npm}} install');
desc('Execute npm run production');
task('npm:production', '{{bin/npm}} run production');

task('composer', function () {
    run('cd {{release_path}} && {{bin/composer}} install --no-dev 2>&1');
});
task('create_public', function () {
    run('cd {{deploy_path}} && ln -snf current/web public');
});

task('composer:authenticate_satis', function () {
    run("{{bin/composer}} global config http-basic.satis.creativeorange.dev {{satis_username}} {{satis_password}}");
});

inventory('hosts.yml');

desc('Deploy your project');
task('deploy', [
    'deploy:info',
    'deploy:prepare',
    'deploy:lock',
    'deploy:release',
    'composer:authenticate_satis',
    'deploy:update_code',
    'deploy:shared',
    'composer',
    'npm:install',
    'npm:production',
    'deploy:clear_paths',
    'deploy:symlink',
    'create_public',
    'deploy:unlock',
    'cleanup',
    'success',
]);

after('deploy:vendors', 'craft:migrate');
after('deploy:failed', 'deploy:unlock');