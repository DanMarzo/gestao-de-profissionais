namespace Gestao.Profissionais.Domain.Interfaces;

public interface IRepository
{
    Task<IEnumerable<T>> GetEntities<T>(Expression<Func<T, bool>> where) where T : class;
    Task<IEnumerable<T>> GetEntities<T>() where T : class;
    Task<T?> GetEntityAsync<T>(
        Expression<Func<T, bool>> where,
        bool disableTracking = true,
        List<Expression<Func<T, object>>>? includes = null) where T : class;
    Task<int> AddAsync<T>(T entity) where T : class;
    Task<int> UpdateAsync<T>(T entity) where T : class;
    Task<int> DeleteAsync<T>(T entity) where T : class;
    Task<bool> EntityExists<T>(Expression<Func<T, bool>> filter) where T : class;
    Task<int> ExecuteUpdateAsync<T>(
        Expression<Func<T, bool>> where,
        Expression<Func<SetPropertyCalls<T>, SetPropertyCalls<T>>> setPropertyCalls
        ) where T : class;
    Task<int> ExecuteDeleteAsync<T>(Expression<Func<T, bool>> where) where T : class;

    Task<IEnumerable<T>> ListEntities<T>(RequestListModel request) where T : class;
    Task<IEnumerable<T>> ListEntities<T>(RequestListModel request, List<Expression<Func<T, object>>> includes) where T : class;
    Task<IEnumerable<T>> ListEntities<T>(RequestListModel request, List<Expression<Func<T, object>>> includes, Expression<Func<T, bool>> where) where T : class;
    Task<int> CountAsync<T>() where T : class;
    Task<int> CountAsync<T>(Expression<Func<T, bool>> where) where T : class;
}
