import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends Component {
    renderInput = ({ input, label, meta }) => {
        console.log(meta);
        const classNameToAdd =
            meta.error && meta.touched && !meta.active
                ? 'field error'
                : 'field';
        return (
            <div className={classNameToAdd}>
                <label>{label}</label>
                <input {...input} />
                {this.renderError(meta)}
            </div>
        );
    };

    renderError = ({ error, touched }) => {
        if (touched && error) {
            return (
                <div className='ui error message'>
                    <p>{error}</p>
                </div>
            );
        }
    };

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    };

    render() {
        return (
            <>
                <form
                    onSubmit={this.props.handleSubmit(this.onSubmit)}
                    className='ui form error'
                >
                    <Field
                        name='title'
                        component={this.renderInput}
                        label='Enter Title'
                    />
                    <Field
                        name='description'
                        component={this.renderInput}
                        label='Enter Title'
                    />
                    <button className='ui button primary'>Submit</button>
                </form>
            </>
        );
    }
}

const validate = formValues => {
    const errors = {};
    if (!formValues.title) {
        errors.title = 'Please add a title';
    }
    if (!formValues.description) {
        errors.description = 'Please enter a description';
    }
    return errors;
};

export default reduxForm({
    form: 'stream-form',
    validate: validate
})(StreamForm);
