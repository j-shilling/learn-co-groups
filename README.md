- [User Stories](#orgd5a8e46)
- [Grouping Algorithm](#org351b71a)

I've recently moved over to the online structure program to teach a cohort of part time students. These students seem to have a unique difficulty when it comes to finding opportunities to pair with others in their cohort: as part time students there's no expectations for them to quit their jobs, abandon their kids, and be available all day, the way the full timers do.

I want these students to have the same opportunities to gain experience programming collaboratively&#x2013;and to bond with others in their cohort to form a stronger group-identity&#x2013;but manually making pairs out of students at different levels *and* different time zones is just too much for one cohort lead to do with enough regularity.

So I'm going to start working on an web API to help automate this process. Ideally, I'd like to make it customization enough for other leads to use and tweak to the needs of their specific cohorts. My vision is that a user (i.e. lead) will be able to specify an arbitrary number of properties to take into account when grouping students and assign a priority to each of these properties. Personally, I'd like to be able to generate groups of 2-3 students, whose total number of completed labs doesn't deviate by more than a configurable amount, whose time zone is not more than an hour apart, and who have been groups before the fewest number of times.

![img](meme.jpg "DANK MEME AYY LMOA")


<a id="orgd5a8e46"></a>

# User Stories

A user should be able to:

-   Log in with their learn-co account
-   View the batches (s)he is teaching
-   View a table of students within a particular batch. The table should include:
    -   names
        -   editable
        -   stored in DB
    -   slack handles
        -   editable
        -   stored in DB
    -   home city (state, country, or whatever)
        -   editable
        -   stored in DB
    -   time zone (*at least* the UTC offset)
        -   Re-calculated for each user session.
        -   Not-user editable
        -   Pulled from an API (probably [Google's Time Zone API](https://developers.google.com/maps/documentation/timezone/intro))
    -   number of labs completed in current track
        -   Re-calculated for each user session
        -   Not-user editable
        -   Pulled from the [Learn-co API](http://api.learn.co/)
-   Generate a group of students: see [Grouping Algorithm](#org351b71a)
    -   Configure group generations with the following options:
        -   Approximate number of students for each group
        -   Whether to automatically start a slack group with each group member
        -   Set up an order list of properties to group by. For each property, the user can specify whether to maximize or minimize each value, and a hard maximum and minimum allowed value:
            -   Number of times any given pair has worked together before
            -   Difference in lab completion
            -   Difference in UTC offset
    -   Select whether to use these configuration options once or to regular regenerate groups with these options
-   View a list of currently active groups for each batch
-   View the details for a given group
-   Export the a group's details to some markup language:
    -   HTML
    -   Github Flavored Markdown
    -   org (Maybe auto commit to a batch repo, so the main README.org can use #+INCLUDE <PATH<sub>TO</sub><sub>SOME</sub><sub>FILE</sub>>. Simply export to .md and learn homepage is updated)


<a id="org351b71a"></a>

# Grouping Algorithm

1.  Create a queue Q for all students to be grouped
2.  While Q is not empty
    1.  Create a empty group G
    2.  While size of G is less then the approximate number of students per group and Q is not empty
        1.  Pop a student S from Q
        2.  Add S to G
        3.  Create a list L of all students in Q eligible for this group. For each grouping-property where the user has specified a hard min or max check whether a student is eligible for the group: If this student's value relative to *any given* member of G is outside of the hard min, max, the student is not eligible for the group.
        4.  Search students in L for the "best fit"&#x2013;Here's how to compare two students A and B:
            -   Look at the highest priority grouping-property: calculate the mean of that property relative to each member of G for both A and B.
            -   If these means are not equal, then we have our answer:
                -   If we want to maximize this property then the student with the largest mean is a better fit
                -   If we want to minimize this property then the student with the smallest mean is a better fit
            -   If these means are equal, repeat for the second-highest priority grouping-property&#x2026; then the third-highest&#x2026; etc.
        5.  Add "best fit" to G
    3.  Store G in a collection of made groups
