$(document).ready(function(){
  $('#searchUser').on('keyup', function(e){
   let username = e.target.value;

   // Make request to GitHub
   $.ajax({
     url: 'https://api.github.com/users/'+username,
     data:{
       client_id:'bc2ed7a16610062dac7f',
       client_secret:'6e6b8e1de6f13669b7c7e5a3fd1b85bff6c1bf63'
     }
   }).done(function(user){
     $.ajax({
      url: 'https://api.github.com/users/'+username+'/repos',
      data:{
        client_id:'bc2ed7a16610062dac7f',
        client_secret:'6e6b8e1de6f13669b7c7e5a3fd1b85bff6c1bf63',
        sort:'created: asc',
        per_page:5
      }
     }).done(function(repos){
       $.each(repos, function(index, repo){
         $('#repos').append(`
          <div class="card">
            <div class="row">
              <div class="col-md-7">
                <strong>${repo.name}</strong>: ${repo.description}
              </div>
              <div class="col-md-3">
                <span class="badge badge-success">Forks: ${repo.forks_count}</span>
                <span class="badge badge-warning">Watchers: ${repo.watchers_count}</span>
                <span class="badge badge-danger">Stars: ${repo.stargazers_count}</span>
              </div>
              <div class="col-md-2">
                <a href="${repo.html_url}" target="_blank" class="btn btn-dark">Repo Page</a>
              </div>
            </div>
          </div>
         `);
       })
     })
     $('#profile').html(`
     <div class="card">
      <div class="card-header">
        <h3 class="card-title">${user.name}</h3>
      </div>
      <div class="card-body">
        <div class="row">
          <div class="col-md-3">
            <img src="${user.avatar_url}" alt="Avatar" class="img-thumbnail card-img">
            <a href="${user.html_url}" class="btn btn-primary btn-block" target="_blank">View Profile</a>
          </div>
          <div class="col-md-9">
            <span class="badge badge-success">Public Repositories: ${user.public_repos}</span>
            <span class="badge badge-warning">Public Gists: ${user.public_gists}</span>
            <span class="badge badge-danger">Public Followers: ${user.followers}</span>
            <span class="badge badge-info">Public Following: ${user.following}</span>
            <br><br>
            <ul class="list-group>
              <li class="list-group-item>Company: ${user.company}</li>  
              <li class="list-group-item>Website/Blog: ${user.blog}</li>  
              <li class="list-group-item>Location: ${user.location}</li>  
              <li class="list-group-item>Member Since: ${user.created_at}</li>  
            </ul>
          </div>
        </div>
      </div>
     </div>
     <h3 class="display-3">Latest Repos</h3>
     <div id="repos"></div>
     `);
   });
  })
});