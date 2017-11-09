class Timer extends React.Component {
    render() {
        const elapsedString = helpers.renderElapsedString(this.props.elapsed);
        return (
            <div className='ui centered card'>
                <div className='content'>
                    <div className='header'>{this.props.title}</div>
                    <div className='meta'>{this.props.project}</div>

                    <div className='center aligned description'>
                        <h2>{elapsedString}</h2>
                    </div>
                    <div className='extra content'>
                        <span className='right floated edit icon'>
                            <i className='edit icon' />
                        </span>
                        <span className='right floated trash icon'>
                            <i className='trash icon' />
                        </span>
                    </div>
                </div>
                <div className='ui bottom attached blue basic button'>
                    Start
                </div>
            </div>
        );
    }
}

class ToggleableTimerForm extends React.Component {
    state = {
        isOpen: false
    }
    handleFormOpen = () => {
        this.setState({ isOpen: true });
    }
    onFormSubmit = (timer) => {
        this.props.onFormSubmit(timer);
        this.setState({ isOpen: false })
    }
    onFormCancel = () => {
        this.setState({ isOpen: false })
    }
    render() {
        if (this.state.isOpen) {
            return (<TimerForm onFormSubmit={this.onFormSubmit}
                onFormCancel={this.onFormCancel} />);
        } else {
            return (<div className='ui basic content center aligned segment'>
                <button className='ui basic button icon' onClick={this.handleFormOpen}>
                    <i className='plus icon' />
                </button>
            </div>);
        }
    }
}

class TimerForm extends React.Component {
    state = {
        title: this.props.title || '',
        project: this.props.project || ''
    }
    handleTitleChange = (e) => {
        this.setState({ title: e.target.value })
    }
    handleProjectChange = (e) => {
        this.setState({ project: e.target.value })
    }
    handleSubmit = () => {
        this.props.onFormSubmit({
            id: this.props.id,
            title: this.state.title,
            project: this.state.project
        })
    }
    handleCancel = () => {
        this.props.onFormCancel();
    }
    render() {
        const submitText = this.props.id ? 'Update' : 'Create';

        return (
            <div className='ui centered card'>
                <div className='content'>
                    <div className='ui form'>
                        <div className='field'>
                            <label>Title</label>
                            <input type='text'
                                value={this.props.title}
                                onChange={this.handleTitleChange} />
                        </div>
                        <div className='field'>
                            <label>Project</label>
                            <input type='text'
                                value={this.props.project}
                                onChange={this.handleProjectChange} />
                        </div>
                        <div className='ui two bottom attached buttons'>
                            <button className='ui basic blue button'
                                onClick={this.handleSubmit}>
                                {submitText}</button>
                            <button className='ui basic red button'
                                onClick={this.handleCancel}>Cancel</button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

class EditableTimer extends React.Component {
    render() {
        if (this.props.editFormOpen) {
            return (
                <TimerForm title={this.props.title}
                    project={this.props.project} />
            )
        } else {
            return (
                <Timer title={this.props.title}
                    project={this.props.project}
                    elapsed={this.props.elapsed}
                    runnningSince={this.props.runnningSince} />
            );
        }
    }
}

class EditableTimerList extends React.Component {
    render() {

        const timers = this.props.timers.map((timer) => (
            <EditableTimer key={timer.id}
                key={timer.id}
                title={timer.title}
                project={timer.project}
                elapsed={timer.elapsed}
                runnningSince={timer.runnningSince} />
        ));
        return (
            <div id="timers">
                {timers}
            </div>
        );
    }
}

class TimersDashboard extends React.Component {
    state = {
        timers: [
            {
                title: 'Pratice squat',
                project: 'Gym Chores',
                id: uuid.v4(),
                elapsed: 5456099,
                runnningSince: Date.now()
            },
            {
                title: 'Bake squasht',
                project: 'Kitechen Chores',
                id: uuid.v4(),
                elapsed: 1273998,
                runnningSince: null
            }
        ]
    }
    onFormSubmit = (timer) => {
        let newTimer = helpers.newTimer(timer);
        this.setState((prev, prop) => {
            return { timers: prev.timers.concat(newTimer) };
        });
    }
    render() {
        return (
            <div className="ui three column centered grid">
                <div>
                    <EditableTimerList timers={this.state.timers} />
                    <ToggleableTimerForm isOpen={false}
                        onFormSubmit={this.onFormSubmit} />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<TimersDashboard />, document.getElementById('content'));