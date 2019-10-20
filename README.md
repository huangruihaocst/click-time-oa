# The Pirate Shop

Ruihao Huang (huangruihao1996@gmail.com)

[Question Address](https://www.clicktime.com/ctc/devintern.html) - Question 2

## Run

1. Install Node.js

2. Install packages.

   ```bash
   $ npm install
   ```

3. Run.

   ```bash
   $ npm start
   ```

4. Open your browser and access [127.0.0.1:3000](127.0.0.1:3000).

## Explanations

1. It is a single-user shopping cart, which means the shopping cart can only be used by one user. If a second user would like to use it, he/she will need to run a new copy of the service on a different port and another fake db. I did this to make it simple.
2. I used Node.js for the back-end on this question. Actually, I think doing everything in the front-end can also satisfy all the requirements, but having a backend can support data persistence, which means the user's purchasing history can be retrieved even if he/she closes his/her browser.
3. I used the simplest fake database, which is a json file. I used it to make everything simple, instead of I do not know how to leverage a database. Hopefully it will not influnence your evalution on the project.

## About

If you have any question about the project, please do not hesistate to contact me at huangruihao1996@gmail.com.
