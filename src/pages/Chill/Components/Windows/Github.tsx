import React, { useEffect, useState } from "react";
import GitHubCalendar from "react-github-calendar";

interface GithubProfile {
    avatar_url: string;
    name: string;
    login: string;
    followers: number;
    following: number;
    location: string | null;
    html_url: string;
}

interface GithubRepo {
    id: number;
    name: string;
    html_url: string;
    language: string | null;
}
const GitHubCard = () => {
    const [profile, setProfile] = useState<GithubProfile | null>(null);
    const [repos, setRepos] = useState<GithubRepo[]>([]);
    const username = "barathsurya2004";

    useEffect(() => {
        fetch(`https://api.github.com/users/${username}`)
            .then((res) => res.json())
            .then(setProfile);

        fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`)
            .then((res) => res.json())
            .then(setRepos);
    }, []);

    if (!profile) return <div className="p-4">Loading...</div>;

    return (
        <div className="min-w-300 mx-auto bg-[#0d1117] text-white rounded-lg p-6 shadow-xl min-h-200">
            <div className="flex items-center space-x-6">
                <img
                    src={profile.avatar_url}
                    alt="Avatar"
                    className="w-32 h-32 rounded-full border-4 border-white"
                />
                <div>
                    <h1 className="text-3xl font-bold">{profile.name}</h1>
                    <p className="text-gray-400">{profile.login} · he/him</p>
                    <div className="mt-2 text-sm text-gray-400">
                        👥 {profile.followers} followers · 👤 {profile.following} following
                    </div>
                    <p className="mt-1 text-sm text-gray-500">🌐 {profile.location || "N/A"}</p>
                </div>
            </div>

            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Pinned Repositories</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {repos.map((repo) => (
                        <div key={repo.id} className="bg-[#161b22] p-4 rounded-lg border border-gray-700">
                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-lg font-semibold text-blue-400 hover:underline"
                            >
                                {repo.name}
                            </a>
                            <p className="text-sm text-gray-400 mt-1">{repo.language || "Unknown"}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-8 flex flex-col items-center">
                <h2 className="text-xl font-semibold mb-4">Commit Calendar</h2>
                <div className="bg-[#161b22] rounded-lg border border-gray-700 p-2" >
                    <GitHubCalendar username={username} colorScheme="dark"
                        style={
                            {
                                width: "100%",
                                height: "auto",
                                borderRadius: "0.5rem",
                                backgroundColor: "#161b22",
                                border: "1px solid #30363d",
                                padding: "1rem",
                            }
                        }
                    />
                </div>
            </div>

            <div className="mt-6 text-sm text-blue-500">
                <a href={profile.html_url} target="_blank" rel="noopener noreferrer">
                    View GitHub Profile →
                </a>
            </div>
        </div>
    );
}

export default GitHubCard