export default function emberMultitonServiceGetMultiton(owner, path, multitonKeys) {
  const manager = owner.lookup('service:multiton-service-manager');

  return manager.getService(path, ...multitonKeys) || manager.addService(path, ...multitonKeys);
}
