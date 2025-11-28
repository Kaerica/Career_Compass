import { FormEvent, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createResourceRequest,
  fetchResources,
  trackResourceAccessRequest,
} from '../api';
import { useAuth } from '../hooks/useAuth';

const resourceTypes = ['article', 'video', 'document', 'course', 'tool'] as const;

const ResourcesPage = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [filters, setFilters] = useState({ category: '', type: '' });
  const { data: resources = [], isLoading } = useQuery({
    queryKey: ['resources', filters],
    queryFn: () => fetchResources({
      category: filters.category || undefined,
      type: filters.type || undefined,
    }),
  });

  const [form, setForm] = useState({
    title: '',
    description: '',
    resourceType: resourceTypes[0],
    fileUrl: '',
    externalUrl: '',
    category: '',
    tags: '',
  });

  const createResource = useMutation({
    mutationFn: createResourceRequest,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['resources'] });
      setForm({
        title: '',
        description: '',
        resourceType: resourceTypes[0],
        fileUrl: '',
        externalUrl: '',
        category: '',
        tags: '',
      });
    },
  });

  const trackAccess = useMutation({
    mutationFn: trackResourceAccessRequest,
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await createResource.mutateAsync({
      title: form.title,
      description: form.description,
      resourceType: form.resourceType,
      fileUrl: form.fileUrl || undefined,
      externalUrl: form.externalUrl || undefined,
      category: form.category || undefined,
      tags: form.tags ? form.tags.split(',').map((tag) => tag.trim()) : undefined,
    });
  };

  return (
    <div className="page">
      <header className="page__header">
        <div>
          <h1>Resources</h1>
          <p>Curated articles, videos, and tools to accelerate growth.</p>
        </div>
      </header>

      <section className="card">
        <div className="card__header">
          <h2>Browse library</h2>
          <div className="filters">
            <input
              type="text"
              placeholder="Filter by category"
              value={filters.category}
              onChange={(event) => setFilters((prev) => ({ ...prev, category: event.target.value }))}
            />
            <select
              value={filters.type}
              onChange={(event) => setFilters((prev) => ({ ...prev, type: event.target.value }))}
            >
              <option value="">All types</option>
              {resourceTypes.map((type) => (
                <option key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isLoading && <p>Loading resources...</p>}

        {!isLoading && (
          <div className="resource-grid">
            {resources.map((resource) => (
              <article key={resource.id} className="resource-card">
                <p className="resource-card__type">{resource.resource_type}</p>
                <h3>{resource.title}</h3>
                <p>{resource.description}</p>
                <div className="resource-card__actions">
                  {resource.external_url && (
                    <a href={resource.external_url} target="_blank" rel="noreferrer">
                      Open link
                    </a>
                  )}
                  {user?.role === 'student' && (
                    <button
                      type="button"
                      className="btn btn--small"
                      onClick={() => trackAccess.mutate(resource.id)}
                    >
                      Mark as reviewed
                    </button>
                  )}
                </div>
              </article>
            ))}
            {resources.length === 0 && <p>No resources yet.</p>}
          </div>
        )}
      </section>

      {(user?.role === 'counselor' || user?.role === 'admin') && (
        <section className="card">
          <div className="card__header">
            <h2>Share a resource</h2>
            <p>Upload articles, worksheets, or recorded sessions.</p>
          </div>
          <form className="form form--grid" onSubmit={handleSubmit}>
            <label className="form__label">
              Title
              <input
                type="text"
                value={form.title}
                onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                required
              />
            </label>
            <label className="form__label">
              Category
              <input
                type="text"
                value={form.category}
                onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
              />
            </label>
            <label className="form__label">
              Type
              <select
                value={form.resourceType}
                onChange={(event) => setForm((prev) => ({ ...prev, resourceType: event.target.value as typeof resourceTypes[number] }))}
              >
                {resourceTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </label>
            <label className="form__label form__label--full">
              Description
              <textarea
                value={form.description}
                onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
                rows={3}
                required
              />
            </label>
            <label className="form__label">
              File URL
              <input
                type="url"
                value={form.fileUrl}
                onChange={(event) => setForm((prev) => ({ ...prev, fileUrl: event.target.value }))}
              />
            </label>
            <label className="form__label">
              External link
              <input
                type="url"
                value={form.externalUrl}
                onChange={(event) => setForm((prev) => ({ ...prev, externalUrl: event.target.value }))}
              />
            </label>
            <label className="form__label form__label--full">
              Tags (comma separated)
              <input
                type="text"
                value={form.tags}
                onChange={(event) => setForm((prev) => ({ ...prev, tags: event.target.value }))}
              />
            </label>
            <button
              type="submit"
              className="btn btn--primary form__submit"
              disabled={createResource.isPending}
            >
              {createResource.isPending ? 'Publishing...' : 'Publish resource'}
            </button>
          </form>
        </section>
      )}
    </div>
  );
};

export default ResourcesPage;


