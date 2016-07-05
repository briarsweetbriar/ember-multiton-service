export default function emberMultitonServiceGetMultiton(owner, path, multitonPropertiesArray) {
  const manager = owner.lookup('service:multiton-service-manager');

  return manager.getService(path, multitonPropertiesArray) || manager.addService(path, multitonPropertiesArray);
}
