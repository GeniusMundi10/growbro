import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { motion } from 'framer-motion';
import { supabase } from '../supabaseClient';

const initialValues = {
  name: '',
  email: '',
  message: '',
};

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  message: Yup.string().required('Message is required'),
});

export default function Contact() {
  return (
    <section className="contact-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="contact-hero"
      >
        <div className="contact-emoji">🚀</div>
        <h2 className="contact-title">
          Let’s Grow Together!
        </h2>
        <p className="contact-subtitle">
          Book a demo, ask a question, or just say hi — we reply fast!
        </p>
      </motion.div>
      <div className="contact-flex">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="contact-options"
        >
          <a
            href="https://wa.me/919312639676"
            className="contact-btn whatsapp"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact-btn-icon">🟢</span> Chat on WhatsApp
          </a>
          <a
            href="mailto:conversation@growbro.ai"
            className="contact-btn email"
          >
            <span className="contact-btn-icon">✉️</span> Email Us
          </a>
          <a
            href="tel:+919312639676"
            className="contact-btn phone"
          >
            <span className="contact-btn-icon">📞</span> Call Us
          </a>
          <div className="contact-badges">
            <span className="contact-badge">Meta Business Partner</span>
            <span className="contact-badge">Data Secure</span>
            <span className="contact-badge">Trusted by 100+ Indian brands</span>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="contact-form-wrapper"
        >
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm, setSubmitting }) => {
              try {
                const { error } = await supabase
                  .from('contact_messages')
                  .insert([
                    {
                      name: values.name,
                      email: values.email,
                      message: values.message,
                    },
                  ]);
                if (error) {
                  alert('There was an error submitting your message. Please try again.');
                } else {
                  alert('Thank you! We will contact you soon.');
                  resetForm();
                }
              } catch (e) {
                alert('There was an error submitting your message. Please try again.');
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="contact-form">
                <div>
                  <label htmlFor="name" className="contact-label">Name</label>
                  <Field name="name" className="contact-input" />
                  <ErrorMessage name="name" component="div" className="contact-error" />
                </div>
                <div>
                  <label htmlFor="email" className="contact-label">Email</label>
                  <Field name="email" type="email" className="contact-input" />
                  <ErrorMessage name="email" component="div" className="contact-error" />
                </div>
                <div>
                  <label htmlFor="message" className="contact-label">Message</label>
                  <Field as="textarea" name="message" rows="4" className="contact-input" />
                  <ErrorMessage name="message" component="div" className="contact-error" />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="contact-submit"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </Form>
            )}
          </Formik>
        </motion.div>
      </div>
    </section>
  );
}
