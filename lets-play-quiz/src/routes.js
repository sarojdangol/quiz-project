import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import HomePage from './pages/homePage';
import CategoryDetail from './pages/categoryDetail';
import QuizPage from './pages/quizPage';
import QuizResult from './pages/quizResult';
import PlayersList from './component/playersList';
import SignInSide from './pages/signIn';
import ManagePoll from './pages/managePoll';
import PollList from './pages/poll_list';
import PlayPoll from './pages/play_poll';

export default function Routes() {

    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/" exact >
                        <HomePage />

                    </Route>
                    <Route path="/category/:id" exact>
                        <CategoryDetail />

                    </Route>
                    <Route path="/play/:categoryId/:level/:number" exact>
                        <QuizPage />

                    </Route>
                    <Route path="/result" exact>
                        <QuizResult />

                    </Route>
                    <Route path="/signin" exact>
                        <SignInSide />

                    </Route>
                    <Route path="/poll/manage" exact>
                        <ManagePoll />

                    </Route>
                    <Route path="/poll/list" exact>
                        <PollList />

                    </Route>
                    <Route path="/playPoll/:id" exact>
                        <PlayPoll />

                    </Route>
                </Switch>
            </Router>
        </div>
    );
}