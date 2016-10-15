import React, { Component, PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { createPost } from '../actions/index';

const renderInput = field =>
  <div className={`form-group ${field.meta.touched && field.meta.invalid ? 'has-error' : ''}`}>
    <label>{field.title}</label>
    <input {...field.input} type={field.type} className={field.className} placeholder={field.title}/>
    {field.meta.touched &&
     field.meta.error &&
     <span className="help-block">{field.meta.error}</span>}
  </div>

const renderTextarea = field =>
    <div className={`form-group ${field.meta.touched && field.meta.invalid ? 'has-error' : ''}`}>
      <textarea {...field.input} type={field.type}  className={field.className} placeholder={field.title}/>
      {field.meta.touched &&
       field.meta.error &&
       <span className="help-block">{field.meta.error}</span>}
    </div>



class PostsNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        this.context.router.push('/');
      })
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <h3>Create a new post</h3>
          <Field name="title" className="form-control"
            component={renderInput} title="Title"/>


            <Field name="categories" className="form-control" component={renderInput} title="Categories"/>

          <div className="form-group">
            <label>Content</label>
            <Field name="content" className="form-control" component={renderTextarea} title="Put content here"/>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a title';
  }

  if (!values.categories) {
    errors.categories = 'Enter categories';
  }

  if (!values.content) {
    errors.content = 'Enter some content';
  }

  return errors;
}

PostsNew = reduxForm({
  form: 'PostsNew',
  validate
})(PostsNew);

PostsNew = connect(null, { createPost })(PostsNew);

export default PostsNew;
