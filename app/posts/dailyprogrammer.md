---
Title: Daily Programmer #318 - NBA Revolution
Author: Julian
DateCreated: 09/06/2017
...
 
I've decided to begin posting my solutions to the challenges posted in /r/dailprogrammer - https://www.reddit.com/r/dailyprogrammer/
 
This is my solution to challenge #318 - NBA Revolution.
 
The program begins by converting the string list input into a list of Team objects, which can then be processed. Each team contains its own list of teams it is going to play.
 
The list is then randomized to conform with rule #6.
We then iterate over each team and
- set the opposing team to the team at index teams.Count - 1
- if the team and opposing team are the same, something weird happened. Exit loop.
- increase i by 1
- add the match to the schedule
 
My solution applies all the required rules, without additional processing on two lists.
 
Team.cs
 
    using System.Collections.Generic;
 
    public class Team
    {
        public string Name { get; set; }
        public List<Team> TeamsToPlay { get; set; }
    }
 
Program.cs
    
    using System.Linq;
    using System.Collections.Generic;
    using System;
 
            static void Main(string[] args)
        {
            var teams = new List<string>
            {
                "Atlanta Hawks",
                "Boston Celtics",
                "Brooklyn Nets",
                "Charlotte Hornets",
                "Chicago Bulls",
                "Cleveland Cavaliers",
                "Dallas Mavericks",
                "Denver Nuggets",
                "Detroit Pistons",
                "Golden State Warriors",
                "Houston Rockets",
                "Indiana Pacers",
                "Los Angeles Clippers",
                "Los Angeles Lakers",
                "Memphis Grizzlies",
                "Miami Heat",
                "Milwaukee Bucks",
                "Minnesota Timberwolves",
                "New Orleans Pelicans",
                "New York Knicks",
                "Oklahoma City Thunder",
                "Orlando Magic",
                "Philadelphia 76ers",
                "Phoenix Suns",
                "Portland Trail Blazers",
                "Sacramento Kings",
                "Washington Wizards",
                "San Antonio Spurs",
                "Toronto Raptors",
                "Utah Jazz"
            };
 
            var schedule = new List<String>();
            teams = teams.OrderBy(x => Guid.NewGuid()).ToList();
            int i = 1;
 
            foreach (var team in teams)
            {
                var opposingTeam = teams.ElementAt(teams.Count - i);
 
                if (team == opposingTeam)
                    break;
 
                i++;
                schedule.Add($"Team {team} will play {opposingTeam} at home.");
            }
 
            int n = 0;
            int round = 1;
            foreach (var match in schedule)
            {
                if (n % 2 == 0) Console.WriteLine($"{Environment.NewLine}Round {round}{Environment.NewLine}");
                Console.WriteLine(match);
 
                n++;
                round++;
            }
            Console.ReadLine();
        }
 
 
 
