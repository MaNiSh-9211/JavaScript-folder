res.sendFile('full path from inside the parent folder in which the server file is running with file name', { root: __dirname });
res.sendFile('full path with file name except the current working directory', {root: './' });
res.sendFile('file name', { root:'./full_path_till_the_file'});