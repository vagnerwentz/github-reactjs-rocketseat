/* eslint-disable no-throw-literal */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa';

import Container from '../../components/Container';
import { Form, SubmitButton, List, DualRepo } from './styles';

import api from '../../services/api';

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newRepo: '',
      repositories: [],
      loading: false,
      error: null,
      dualRepo: false,
    };
  }

  // Load data from local storage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');
    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Save data to localStorage
  componentDidUpdate(_, prevState) {
    // prevState => Previous state without change
    const { repositories } = this.state;

    /* Check if the previous repository is different from the new repository */
    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value, error: null });
  };

  handleSubmit = async e => {
    e.preventDefault();
    const { newRepo, repositories } = this.state;

    this.setState({ loading: true, error: false });

    try {
      if (newRepo === '') throw 'Você precisa indicar um repositório!';

      const response = await api.get(`/repos/${newRepo}`);

      const hasRepo = repositories.find(repo => repo.name === newRepo);

      if (hasRepo) {
        this.setState({ dualRepo: true });
        return;
      }

      const data = {
        name: response.data.full_name,
      };
      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
      });
    } catch (error) {
      this.setState({ error: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { newRepo, repositories, loading, error, dualRepo } = this.state;
    return (
      // O Container será de grande utilidade para fazer alguns alinhamentos
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>

        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Adicionar repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#FFF" size={14} />
            ) : (
              <FaPlus color="#FFF" size={14} />
            )}
          </SubmitButton>
          {dualRepo ? (
            <DualRepo>
              <h1>REPO DUPLICADO</h1>
            </DualRepo>
          ) : (
            <></>
          )}
        </Form>
        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              {/* /repository/facebook%2Freact */}
              <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                Detalhes
              </Link>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}
