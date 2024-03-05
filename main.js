
       class GitHub {
        async getUserDetails(username) {
            try {
                let response;
                if(username === "") {
                    response = await fetch(`https://api.github.com/users/vineethoffl`); // Set default username
                } else {
                    response = await fetch(`https://api.github.com/users/${username}`);
                }
                const userData = await response.json();
                this.createUserCard(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }

            createUserCard(userData) {
                const cardHTML = `
            <div class="card">
                <img src="${userData.avatar_url}" alt="Avatar" class="avatar">
                <div class="user-info">
                    <h2>${userData.name}</h2>
                    <p>${userData.bio}</p>
                    <ul>
                        <li>Followers: ${userData.followers}</li>
                        <li>Following: ${userData.following}</li>
                        <li>Repositories: ${userData.public_repos}</li>
                    </ul>
                    <ul>
                        <li>Twitter: ${userData.twitter_username ? userData.twitter_username : 'N/A'}</li>
                        <li>Location: ${userData.location ? userData.location : 'N/A'}</li>
                    </ul>
                </div>
            </div>
        `;
                const main = document.getElementById('main');
                main.innerHTML = cardHTML;
            }
        }

        window.addEventListener('DOMContentLoaded', () => {
            const gitHub = new GitHub();
            gitHub.getUserDetails("vineethoffl"); // Set default username here
        });

        // Trigger search when Enter key is pressed
        document.getElementById('search').addEventListener('keypress', function (event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                const search = document.getElementById('search').value;
                const gitHub = new GitHub();
                gitHub.getUserDetails(search);
            }
        });
